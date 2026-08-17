import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';
import { Share } from '@capacitor/share';
import { Filesystem, Directory } from '@capacitor/filesystem';
import QRCode from 'qrcode';

// Camera utilities
export const openCamera = async (): Promise<string | null> => {
  try {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    return image.dataUrl || null;
  } catch (error) {
    console.error('Camera error:', error);
    throw new Error('Failed to access camera');
  }
};

export const selectPhotoFromGallery = async (): Promise<string | null> => {
  try {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos
    });

    return image.dataUrl || null;
  } catch (error) {
    console.error('Gallery error:', error);
    throw new Error('Failed to access photo gallery');
  }
};

// Location utilities
export const getCurrentLocation = async () => {
  try {
    const position = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 10000
    });

    return {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
      accuracy: position.coords.accuracy
    };
  } catch (error) {
    console.error('Location error:', error);
    throw new Error('Failed to get current location');
  }
};

export const watchLocation = async (callback: (position: any) => void) => {
  try {
    const watchId = await Geolocation.watchPosition({
      enableHighAccuracy: true,
      timeout: 10000
    }, callback);

    return watchId;
  } catch (error) {
    console.error('Location watch error:', error);
    throw new Error('Failed to watch location');
  }
};

// Share utilities
export const shareLocation = async (latitude: number, longitude: number, message?: string) => {
  try {
    const locationUrl = `https://maps.google.com/?q=${latitude},${longitude}`;
    
    await Share.share({
      title: 'YatraShield - My Location',
      text: message || 'Here is my current location for safety',
      url: locationUrl,
      dialogTitle: 'Share Location'
    });
  } catch (error) {
    console.error('Share error:', error);
    throw new Error('Failed to share location');
  }
};

export const shareText = async (title: string, text: string) => {
  try {
    await Share.share({
      title,
      text,
      dialogTitle: 'Share'
    });
  } catch (error) {
    console.error('Share text error:', error);
    throw new Error('Failed to share text');
  }
};

// QR Code utilities
export const generateQRCode = async (data: string): Promise<string> => {
  try {
    const qrCodeDataUrl = await QRCode.toDataURL(data, {
      width: 256,
      margin: 2,
      color: {
        dark: '#1e3a8a', // Primary blue
        light: '#ffffff'
      }
    });
    
    return qrCodeDataUrl;
  } catch (error) {
    console.error('QR Code generation error:', error);
    throw new Error('Failed to generate QR code');
  }
};

// File utilities
export const saveToFileSystem = async (data: string, fileName: string) => {
  try {
    await Filesystem.writeFile({
      path: fileName,
      data: data,
      directory: Directory.Documents
    });
    
    return true;
  } catch (error) {
    console.error('File save error:', error);
    throw new Error('Failed to save file');
  }
};

// Format location for display
export const formatLocation = (latitude: number, longitude: number): string => {
  return `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
};

// Calculate distance between two points
export const calculateDistance = (
  lat1: number, lon1: number, 
  lat2: number, lon2: number
): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  
  return distance;
};

// Emergency contact utilities
export const callEmergencyNumber = (number: string) => {
  window.open(`tel:${number}`, '_system');
};

export const sendSMS = (number: string, message: string) => {
  window.open(`sms:${number}?body=${encodeURIComponent(message)}`, '_system');
};
