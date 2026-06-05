import { type User, type InsertUser, type InsertSubscriber, type NewsletterSubscriber } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  addSubscriber(email: string): Promise<{ isNew: boolean; subscriber: NewsletterSubscriber }>;
  markSubscriberEmailSent(id: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private subscribers: Map<string, NewsletterSubscriber>;

  constructor() {
    this.users = new Map();
    this.subscribers = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async addSubscriber(email: string): Promise<{ isNew: boolean; subscriber: NewsletterSubscriber }> {
    const existing = Array.from(this.subscribers.values()).find(
      (s) => s.email === email
    );
    if (existing) return { isNew: false, subscriber: existing };

    const subscriber: NewsletterSubscriber = {
      id: randomUUID(),
      email,
      subscribedAt: new Date(),
      emailSent: false,
    };
    this.subscribers.set(subscriber.id, subscriber);
    return { isNew: true, subscriber };
  }

  async markSubscriberEmailSent(id: string): Promise<void> {
    const sub = this.subscribers.get(id);
    if (sub) this.subscribers.set(id, { ...sub, emailSent: true });
  }
}

export const storage = new MemStorage();
