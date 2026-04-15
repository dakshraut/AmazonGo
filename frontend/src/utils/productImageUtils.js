// Helper function to get emoji based on product category
export const getCategoryEmoji = (category) => {
  if (!category) return '📦';
  
  const categoryLower = category.toLowerCase();
  
  if (categoryLower.includes('electronics') || categoryLower.includes('phone') || 
      categoryLower.includes('laptop') || categoryLower.includes('computer') ||
      categoryLower.includes('tablet') || categoryLower.includes('watch') ||
      categoryLower.includes('camera')) {
    return '📱';
  }
  
  if (categoryLower.includes('fashion') || categoryLower.includes('clothing') || 
      categoryLower.includes('dress') || categoryLower.includes('shirt') ||
      categoryLower.includes('pants') || categoryLower.includes('shoes') ||
      categoryLower.includes('apparel')) {
    return '👕';
  }
  
  if (categoryLower.includes('home') || categoryLower.includes('furniture') || 
      categoryLower.includes('decor') || categoryLower.includes('kitchen') ||
      categoryLower.includes('bedroom') || categoryLower.includes('living')) {
    return '🏠';
  }
  
  if (categoryLower.includes('sports') || categoryLower.includes('outdoor') || 
      categoryLower.includes('fitness') || categoryLower.includes('gym') ||
      categoryLower.includes('yoga') || categoryLower.includes('ball')) {
    return '⚽';
  }
  
  if (categoryLower.includes('book') || categoryLower.includes('reading') || 
      categoryLower.includes('literature') || categoryLower.includes('novel')) {
    return '📚';
  }
  
  if (categoryLower.includes('beauty') || categoryLower.includes('cosmetics') || 
      categoryLower.includes('skincare') || categoryLower.includes('makeup') ||
      categoryLower.includes('fragrance') || categoryLower.includes('perfume')) {
    return '💄';
  }
  
  return '📦';
};

// Component for image placeholder with fallback
export const ImagePlaceholder = ({ 
  category, 
  height = '160px',
  width = '100%',
  borderRadius = '8px',
  iconSize = '48px' 
}) => {
  const emoji = getCategoryEmoji(category);
  
  return (
    <div
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: '#E5E7EB',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: iconSize,
      }}
      className="flex-shrink-0"
    >
      {emoji}
    </div>
  );
};
