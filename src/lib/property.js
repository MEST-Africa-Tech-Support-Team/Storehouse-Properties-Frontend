
export class Property {
  constructor(data) {
    this.id = data.id;
    this.image = data.image;
    this.title = data.title || "The Avery Apartment";
    this.location = data.location || "Greater Accra, Ghana";
    this.rating = data.rating || 4.9;
    this.price = data.price || 180;
    this.badge = data.badge; 
    this.isFavorite = false;
    this.category = data.category || "Apartment";
  }

  get formattedPrice() {
    return `$${this.price}`;
  }
}

export class PropertyService {
  static ITEMS_PER_PAGE = 8;

  static getPaginatedItems(items, page) {
    return items.slice(0, page * this.ITEMS_PER_PAGE);
  }

  static getTotalCount(items) {
    return items.length;
  }
}