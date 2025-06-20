export const getTypeName = (typeSlug: string | undefined): string => {
  if (!typeSlug) return '';

  const typeMap: Record<string, string> = {
    'bong-da': 'bóng đá',
    'cau-long': 'cầu lông',
    'tennis': 'tennis',
    'bong-ban': 'bóng bàn',
  };

  return typeMap[typeSlug] || typeSlug.replace(/-/g, ' ');
};