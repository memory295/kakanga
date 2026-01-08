import { supabase } from './supabase';

export async function uploadFile(file: File, folder: 'projects' | 'services' | 'staff'): Promise<string> {
  try {
    // Create a safe filename
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const timestamp = Date.now();
    const fileName = `${timestamp}-${safeName}`;
    const filePath = `${folder}/${fileName}`;
    
    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('uploads') // You'll need to create this bucket in Supabase
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });
    
    if (error) {
      console.error('Upload error:', error);
      throw error;
    }
    
    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('uploads')
      .getPublicUrl(filePath);
    
    return publicUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}

export async function deleteFile(url: string): Promise<boolean> {
  try {
    // Extract the file path from the URL
    const urlParts = url.split('/');
    const filePath = urlParts.slice(-2).join('/'); // Get folder/filename
    
    const { error } = await supabase.storage
      .from('uploads')
      .remove([filePath]);
    
    if (error) {
      console.error('Delete error:', error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
}

export async function getFileUrl(path: string): Promise<string | null> {
  try {
    const { data } = supabase.storage
      .from('uploads')
      .getPublicUrl(path);
    
    return data.publicUrl;
  } catch (error) {
    console.error('Error getting file URL:', error);
    return null;
  }
}