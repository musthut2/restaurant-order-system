CREATE DATABASE IF NOT EXISTS restaurant;
USE restaurant;

CREATE TABLE IF NOT EXISTS Users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  role ENUM('admin', 'waiter', 'kitchen', 'cashier'),
  password_hash VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Tables (
  table_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50),
  status ENUM('free', 'occupied', 'reserved')
);

CREATE TABLE IF NOT EXISTS MenuItems (
  item_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  price DECIMAL(10,2),
  category VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS Orders (
  order_id INT AUTO_INCREMENT PRIMARY KEY,
  table_id INT,
  waiter_id INT,
  order_time DATETIME,
  status ENUM('pending', 'processing', 'completed', 'canceled'),
  FOREIGN KEY (table_id) REFERENCES Tables(table_id),
  FOREIGN KEY (waiter_id) REFERENCES Users(user_id)
);

CREATE TABLE IF NOT EXISTS OrderItems (
  order_item_id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  item_id INT,
  quantity INT,
  FOREIGN KEY (order_id) REFERENCES Orders(order_id),
  FOREIGN KEY (item_id) REFERENCES MenuItems(item_id)
);
