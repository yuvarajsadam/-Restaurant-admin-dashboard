require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');
const Order = require('./models/Order');

const menuItems = [
  // Appetizers
  {
    name: 'Paneer Tikka',
    description: 'Skewered paneer cubes marinated in spiced yogurt and grilled to perfection',
    category: 'Appetizer',
    price: 249,
    ingredients: ['Paneer', 'Yogurt', 'Capsicum', 'Onion', 'Indian Spices'],
    isAvailable: true,
    preparationTime: 20,
    imageUrl: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0'
  },
  {
    name: 'Chicken 65',
    description: 'Spicy, deep-fried chicken tempered with curry leaves and green chilies',
    category: 'Appetizer',
    price: 279,
    ingredients: ['Chicken', 'Chili Powder', 'Curry Leaves', 'Ginger-Garlic Paste'],
    isAvailable: true,
    preparationTime: 15,
    imageUrl: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91'
  },
  {
    name: 'Veg Samosa (2pcs)',
    description: 'Crispy pastry filled with spiced potatoes and peas',
    category: 'Appetizer',
    price: 99,
    ingredients: ['Flour', 'Potatoes', 'Peas', 'Spices'],
    isAvailable: true,
    preparationTime: 10,
    imageUrl: 'https://images.unsplash.com/photo-1601050690597-df056fb27796'
  },
  {
    name: 'Gobi Manchurian',
    description: 'Crispy cauliflower florets tossed in a spicy Indo-Chinese sauce',
    category: 'Appetizer',
    price: 219,
    ingredients: ['Cauliflower', 'Soy Sauce', 'Spring Onion', 'Garlic'],
    isAvailable: true,
    preparationTime: 18,
    imageUrl: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84'
  },
  
  // Main Courses
  {
    name: 'Butter Chicken',
    description: 'Tender chicken cooked in a rich, creamy tomato-based gravy',
    category: 'Main Course',
    price: 449,
    ingredients: ['Chicken', 'Butter', 'Cream', 'Tomato Puree', 'Kashmiri Mirch'],
    isAvailable: true,
    preparationTime: 25,
    imageUrl: 'https://images.unsplash.com/photo-1603894584115-f73f2ec04576'
  },
  {
    name: 'Paneer Butter Masala',
    description: 'Soft paneer cubes in a classic smooth and creamy butter gravy',
    category: 'Main Course',
    price: 379,
    ingredients: ['Paneer', 'Cashews', 'Cream', 'Tomato', 'Butter'],
    isAvailable: true,
    preparationTime: 20,
    imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7'
  },
  {
    name: 'Dal Makhani',
    description: 'Slow-cooked black lentils with butter and cream - a house favorite',
    category: 'Main Course',
    price: 319,
    ingredients: ['Black Urad Dal', 'Rajma', 'Butter', 'Cream'],
    isAvailable: true,
    preparationTime: 30,
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d'
  },
  {
    name: 'Chicken Biryani',
    description: 'Fragrant basmati rice cooked with succulent chicken and aromatic spices',
    category: 'Main Course',
    price: 399,
    ingredients: ['Basmati Rice', 'Chicken', 'Saffron', 'Mint', 'Biryani Spices'],
    isAvailable: true,
    preparationTime: 35,
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8'
  },
  {
    name: 'Garlic Naan',
    description: 'Soft leavened bread topped with fresh garlic and coriander',
    category: 'Main Course',
    price: 79,
    ingredients: ['Refined Flour', 'Garlic', 'Coriander', 'Butter'],
    isAvailable: true,
    preparationTime: 10,
    imageUrl: 'https://images.unsplash.com/photo-1601303584126-269c2d5d5401'
  },
  
  // Desserts
  {
    name: 'Gulab Jamun (2pcs)',
    description: 'Deep-fried milk solids soaked in cardamom-flavored sugar syrup',
    category: 'Dessert',
    price: 149,
    ingredients: ['Khoya', 'Sugar Syrup', 'Cardamom', 'Pistachios'],
    isAvailable: true,
    preparationTime: 5,
    imageUrl: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848'
  },
  {
    name: 'Rasmalai (2pcs)',
    description: 'Soft cheese patties soaked in thickened, saffron-infused milk',
    category: 'Dessert',
    price: 179,
    ingredients: ['Paneer', 'Milk', 'Saffron', 'Almonds'],
    isAvailable: true,
    preparationTime: 5,
    imageUrl: 'https://images.unsplash.com/photo-1627916607164-cdb9ce1d3822'
  },
  {
    name: 'Gajar Ka Halwa',
    description: 'Traditional slow-cooked carrot pudding with milk and dry fruits',
    category: 'Dessert',
    price: 199,
    ingredients: ['Carrots', 'Milk', 'Sugar', 'Ghee', 'Dry Fruits'],
    isAvailable: true,
    preparationTime: 20,
    imageUrl: 'https://images.unsplash.com/photo-1599307767316-776533bb941c'
  },
  
  // Beverages
  {
    name: 'Mango Lassi',
    description: 'Creamy yogurt drink blended with sweet mango pulp',
    category: 'Beverage',
    price: 119,
    ingredients: ['Yogurt', 'Mango Pulp', 'Sugar'],
    isAvailable: true,
    preparationTime: 10,
    imageUrl: 'https://images.unsplash.com/photo-1549421263-54acc1746976'
  },
  {
    name: 'Masala Chai',
    description: 'Traditional Indian tea with milk and aromatic spices',
    category: 'Beverage',
    price: 59,
    ingredients: ['Tea Leaves', 'Milk', 'Ginger', 'Cardamom'],
    isAvailable: true,
    preparationTime: 10,
    imageUrl: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8'
  },
  {
    name: 'Fresh Lime Soda',
    description: 'Refreshing soda with fresh lime juice, salt or sugar',
    category: 'Beverage',
    price: 89,
    ingredients: ['Soda', 'Lime', 'Salt/Sugar'],
    isAvailable: true,
    preparationTime: 5,
    imageUrl: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd'
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seed with Indian Menu Items...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Clear existing data
    await MenuItem.deleteMany({});
    await Order.deleteMany({});
    console.log('🗑️  Cleared existing data');
    
    // Insert menu items
    const createdMenuItems = await MenuItem.insertMany(menuItems);
    console.log(`✅ Created ${createdMenuItems.length} menu items`);
    
    // Create sample orders across different stages
    const sampleOrders = [
      {
        items: [
          { menuItem: createdMenuItems[0]._id, quantity: 2, price: createdMenuItems[0].price },
          { menuItem: createdMenuItems[5]._id, quantity: 1, price: createdMenuItems[5].price }
        ],
        totalAmount: (createdMenuItems[0].price * 2) + createdMenuItems[5].price,
        status: 'Delivered',
        customerName: 'Rahul Sharma',
        tableNumber: 5,
        statusHistory: [
          { status: 'Pending', timestamp: new Date(Date.now() - 3600000) },
          { status: 'Preparing', timestamp: new Date(Date.now() - 3000000) },
          { status: 'Ready', timestamp: new Date(Date.now() - 2000000) },
          { status: 'Delivered', timestamp: new Date(Date.now() - 1000000) }
        ]
      },
      {
        items: [
          { menuItem: createdMenuItems[7]._id, quantity: 1, price: createdMenuItems[7].price },
          { menuItem: createdMenuItems[12]._id, quantity: 2, price: createdMenuItems[12].price }
        ],
        totalAmount: createdMenuItems[7].price + (createdMenuItems[12].price * 2),
        status: 'Preparing',
        customerName: 'Anjali Gupta',
        tableNumber: 2,
        statusHistory: [
          { status: 'Pending', timestamp: new Date(Date.now() - 1800000) },
          { status: 'Preparing', timestamp: new Date(Date.now() - 1200000) }
        ]
      },
      {
        items: [
          { menuItem: createdMenuItems[4]._id, quantity: 1, price: createdMenuItems[4].price },
          { menuItem: createdMenuItems[8]._id, quantity: 2, price: createdMenuItems[8].price }
        ],
        totalAmount: createdMenuItems[4].price + (createdMenuItems[8].price * 2),
        status: 'Ready',
        customerName: 'Vikram Singh',
        tableNumber: 8,
        statusHistory: [
          { status: 'Pending', timestamp: new Date(Date.now() - 2400000) },
          { status: 'Preparing', timestamp: new Date(Date.now() - 1800000) },
          { status: 'Ready', timestamp: new Date(Date.now() - 600000) }
        ]
      },
      {
        items: [
          { menuItem: createdMenuItems[2]._id, quantity: 4, price: createdMenuItems[2].price },
          { menuItem: createdMenuItems[13]._id, quantity: 4, price: createdMenuItems[13].price }
        ],
        totalAmount: (createdMenuItems[2].price * 4) + (createdMenuItems[13].price * 4),
        status: 'Pending',
        customerName: 'Priya Iyer',
        tableNumber: 1,
        statusHistory: [
          { status: 'Pending', timestamp: new Date(Date.now() - 300000) }
        ]
      },
      {
        items: [
          { menuItem: createdMenuItems[6]._id, quantity: 1, price: createdMenuItems[6].price },
          { menuItem: createdMenuItems[8]._id, quantity: 1, price: createdMenuItems[8].price }
        ],
        totalAmount: createdMenuItems[6].price + createdMenuItems[8].price,
        status: 'Cancelled',
        customerName: 'Sanjay Dutt',
        tableNumber: 10,
        statusHistory: [
          { status: 'Pending', timestamp: new Date(Date.now() - 3600000) },
          { status: 'Cancelled', timestamp: new Date(Date.now() - 3300000) }
        ]
      },
      {
        items: [
          { menuItem: createdMenuItems[1]._id, quantity: 1, price: createdMenuItems[1].price },
          { menuItem: createdMenuItems[14]._id, quantity: 1, price: createdMenuItems[14].price }
        ],
        totalAmount: createdMenuItems[1].price + createdMenuItems[14].price,
        status: 'Delivered',
        customerName: 'Amit Shah',
        tableNumber: 4,
        statusHistory: [
          { status: 'Pending', timestamp: new Date(Date.now() - 7200000) },
          { status: 'Preparing', timestamp: new Date(Date.now() - 6600000) },
          { status: 'Ready', timestamp: new Date(Date.now() - 6000000) },
          { status: 'Delivered', timestamp: new Date(Date.now() - 5400000) }
        ]
      },
      {
        items: [
          { menuItem: createdMenuItems[10]._id, quantity: 2, price: createdMenuItems[10].price }
        ],
        totalAmount: createdMenuItems[10].price * 2,
        status: 'Preparing',
        customerName: 'Deepika P',
        tableNumber: 3,
        statusHistory: [
          { status: 'Pending', timestamp: new Date(Date.now() - 900000) },
          { status: 'Preparing', timestamp: new Date(Date.now() - 300000) }
        ]
      },
      {
        items: [
          { menuItem: createdMenuItems[3]._id, quantity: 1, price: createdMenuItems[3].price },
          { menuItem: createdMenuItems[4]._id, quantity: 1, price: createdMenuItems[4].price }
        ],
        totalAmount: createdMenuItems[3].price + createdMenuItems[4].price,
        status: 'Ready',
        customerName: 'Ranvir S',
        tableNumber: 7,
        statusHistory: [
          { status: 'Pending', timestamp: new Date(Date.now() - 3000000) },
          { status: 'Preparing', timestamp: new Date(Date.now() - 2400000) },
          { status: 'Ready', timestamp: new Date(Date.now() - 1200000) }
        ]
      },
      {
        items: [
          { menuItem: createdMenuItems[11]._id, quantity: 1, price: createdMenuItems[11].price }
        ],
        totalAmount: createdMenuItems[11].price,
        status: 'Pending',
        customerName: 'Kiara A',
        tableNumber: 6,
        statusHistory: [
          { status: 'Pending', timestamp: new Date(Date.now() - 600000) }
        ]
      },
      {
        items: [
          { menuItem: createdMenuItems[7]._id, quantity: 2, price: createdMenuItems[7].price }
        ],
        totalAmount: createdMenuItems[7].price * 2,
        status: 'Delivered',
        customerName: 'Sid M',
        tableNumber: 9,
        statusHistory: [
          { status: 'Pending', timestamp: new Date(Date.now() - 10800000) },
          { status: 'Preparing', timestamp: new Date(Date.now() - 10200000) },
          { status: 'Ready', timestamp: new Date(Date.now() - 9600000) },
          { status: 'Delivered', timestamp: new Date(Date.now() - 9000000) }
        ]
      }
    ];
    
    const createdOrders = [];
    for (const orderData of sampleOrders) {
      const order = await Order.create(orderData);
      createdOrders.push(order);
    }
    console.log(`✅ Created ${createdOrders.length} sample orders`);
    
    console.log('🎉 Database seeded successfully with Indian items and Rupees!');
    console.log('\n📊 Summary:');
    console.log(`   Menu Items: ${createdMenuItems.length} (Indian Cuisine)`);
    console.log(`   Orders: ${createdOrders.length} (Various Stages)`);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:');
    if (error.errors) {
      Object.keys(error.errors).forEach(key => {
        console.error(`${key}: ${error.errors[key].message}`);
      });
    } else {
      console.error(error);
    }
    process.exit(1);
  }
}

seedDatabase();
