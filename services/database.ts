import { Product, User, Order } from '../types';
import { INITIAL_PRODUCTS } from '../constants';

// Simulated Database using LocalStorage
// In a real app, this would connect to a backend like SQL or MongoDB.

const DB_KEYS = {
  PRODUCTS: 'walkin_db_products',
  USERS: 'walkin_db_users',
  ORDERS: 'walkin_db_orders'
};

const initDB = () => {
  if (!localStorage.getItem(DB_KEYS.PRODUCTS)) {
    localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
  }
  if (!localStorage.getItem(DB_KEYS.USERS)) {
    localStorage.setItem(DB_KEYS.USERS, JSON.stringify([]));
  }
  if (!localStorage.getItem(DB_KEYS.ORDERS)) {
    localStorage.setItem(DB_KEYS.ORDERS, JSON.stringify([]));
  }
};

// Initialize on load
initDB();

export const db = {
  products: {
    getAll: (): Product[] => {
      try {
        return JSON.parse(localStorage.getItem(DB_KEYS.PRODUCTS) || '[]');
      } catch {
        return INITIAL_PRODUCTS;
      }
    },
    save: (products: Product[]) => {
      localStorage.setItem(DB_KEYS.PRODUCTS, JSON.stringify(products));
    },
    add: (product: Product) => {
      const products = db.products.getAll();
      products.push(product);
      db.products.save(products);
    },
    update: (product: Product) => {
      const products = db.products.getAll();
      const index = products.findIndex(p => p.id === product.id);
      if (index !== -1) {
        products[index] = product;
        db.products.save(products);
      }
    },
    delete: (id: string) => {
       const products = db.products.getAll();
       const newProducts = products.filter(p => p.id !== id);
       db.products.save(newProducts);
    }
  },
  users: {
    getAll: (): User[] => JSON.parse(localStorage.getItem(DB_KEYS.USERS) || '[]'),
    save: (user: User) => {
        const users = db.users.getAll();
        const index = users.findIndex(u => u.email === user.email);
        if (index !== -1) {
            users[index] = user;
        } else {
            users.push(user);
        }
        localStorage.setItem(DB_KEYS.USERS, JSON.stringify(users));
    },
    get: (email: string): User | undefined => {
        const users = db.users.getAll();
        return users.find(u => u.email === email);
    }
  },
  orders: {
      getAll: (): Order[] => JSON.parse(localStorage.getItem(DB_KEYS.ORDERS) || '[]'),
      add: (order: Order) => {
          const orders = db.orders.getAll();
          orders.unshift(order);
          localStorage.setItem(DB_KEYS.ORDERS, JSON.stringify(orders));
      },
      getByUser: (userId: string): Order[] => {
          const orders = db.orders.getAll();
          return orders.filter(o => o.userId === userId);
      }
  }
};
