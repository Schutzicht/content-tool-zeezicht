import type { APIRoute } from 'astro';
import supabase from '../../db/db';

export const POST: APIRoute = async ({ request }) => {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const ideaId = formData.get('id') as string;

        if (!file || !ideaId) {
            return new Response(JSON.stringify({ error: 'Bestand en ID zijn verplicht' }), { status: 400 });
        }

        // Create a unique filename
        const ext = file.name.split('.').pop() || 'jpg';
        const fileName = `${ideaId}-${Date.now()}.${ext}`;

        // Upload to Supabase Storage
        const arrayBuffer = await file.arrayBuffer();
        const buffer = new Uint8Array(arrayBuffer);

        const { data, error: uploadError } = await supabase.storage
            .from('post-images')
            .upload(fileName, buffer, {
                contentType: file.type,
                upsert: true,
            });

        if (uploadError) {
            console.error('Upload error:', uploadError);
            return new Response(JSON.stringify({ error: uploadError.message }), { status: 500 });
        }

        // Get public URL
        const { data: urlData } = supabase.storage
            .from('post-images')
            .getPublicUrl(fileName);

        const publicUrl = urlData.publicUrl;

        // Save the URL to the database
        const { error: dbError } = await supabase
            .from('content_ideas')
            .update({ final_image_url: publicUrl })
            .eq('id', ideaId);

        if (dbError) {
            console.error('DB error:', dbError);
            return new Response(JSON.stringify({ error: dbError.message }), { status: 500 });
        }

        return new Response(JSON.stringify({ url: publicUrl }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err: any) {
        console.error('Upload failed:', err);
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
};
