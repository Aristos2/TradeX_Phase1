Yes. For **learning Spring Boot properly**, this is actually a much better project than a simple CRUD application.

You don't need real stock APIs initially. Start with **10 hardcoded stocks** and focus on backend concepts:

- JWT Authentication
- Spring Security
- Roles (USER, ADMIN)
- REST APIs
- JPA/Hibernate
- SQL Relationships
- Exception Handling
- Validation
- Pagination
- Swagger
- Docker (later)
- Redis Cache (later)
- WebSocket (later)
- Unit Testing (later)

**PRD: Virtual Stock Trading Simulator**

**Project Name**

**TradeX**  
(Stock Market Learning & Virtual Trading Platform)

**Problem Statement**

Many beginners are afraid to invest real money in the stock market.

TradeX provides a virtual stock trading environment where users receive dummy money and can buy/sell stocks using simulated market prices.

The goal is to learn stock market investing without financial risk.

**Goals**

**User Goals**

- Learn stock investing
- Track profit/loss
- Build confidence before real investing

**Developer Goals**

Practice:

- Spring Boot
- React
- SQL
- JWT
- Security
- Database Design
- System Design

**Initial Scope (MVP)**

**Hardcoded Stocks**

Only 10 stocks.

Example:

| **Symbol** | **Name**                  | **Price** |
| ---------- | ------------------------- | --------- |
| TCS        | Tata Consultancy Services | ₹3500     |
| INFY       | Infosys                   | ₹1600     |
| RELIANCE   | Reliance Industries       | ₹2900     |
| HDFCBANK   | HDFC Bank                 | ₹1800     |
| ICICIBANK  | ICICI Bank                | ₹1200     |
| WIPRO      | Wipro                     | ₹500      |
| SBIN       | SBI                       | ₹900      |
| LT         | Larsen & Toubro           | ₹3800     |
| ITC        | ITC                       | ₹450      |
| BHARTIARTL | Airtel                    | ₹1700     |

Stored in DB.

**User Roles**

**USER**

Can:

- Register
- Login
- View Stocks
- Buy Stock
- Sell Stock
- View Portfolio
- View Transaction History

**ADMIN**

Can:

- Add Stock
- Update Stock Price
- Delete Stock
- View All Users
- View Platform Statistics

**Virtual Money**

Every new user gets:

₹1,00,000

stored in wallet.

**Features**

**Authentication Module**

**APIs**

POST /auth/register

POST /auth/login

POST /auth/refresh-token

Concepts:

- JWT
- BCrypt
- Spring Security

**Stock Module**

**APIs**

GET /stocks

GET /stocks/{symbol}

GET /stocks/search

Response

{

"symbol":"TCS",

"name":"TCS",

"price":3500

}

**Buy Stock**

**API**

POST /trade/buy

Request

{

"stockId":1,

"quantity":5

}

Validation

- Stock exists
- Sufficient balance

**Sell Stock**

**API**

POST /trade/sell

Validation

- User owns stock
- Quantity available

**Portfolio Module**

**API**

GET /portfolio

Response

{

"cash":85000,

"invested":15000,

"currentValue":17000,

"profit":2000

}

**Transaction Module**

**API**

GET /transactions

Stores:

- BUY
- SELL
- Quantity
- Price
- Timestamp

**Database Design**

**User**

id

name

email

password

wallet_balance

role

created_at

**Stock**

id

symbol

company_name

current_price

sector

**Portfolio**

id

user_id

stock_id

quantity

avg_buy_price

**Transaction**

id

user_id

stock_id

transaction_type

quantity

price

timestamp

**Entity Relationships**

User

|

| One-To-Many

|

Transaction

User

|

| One-To-Many

|

Portfolio

Stock

|

| One-To-Many

|

Portfolio

Stock

|

| One-To-Many

|

Transaction

**Tech Stack**

**Backend**

- Java 21
- Spring Boot
- Spring Security
- Spring Data JPA
- JWT
- Lombok
- Validation
- Swagger

**Database**

- PostgreSQL

**Frontend**

- React
- React Router
- Axios
- Tailwind CSS

**Future Enhancements**

**Phase 2**

- Live stock prices
- Yahoo Finance integration
- Watchlist
- Stock Charts
- Top Gainers
- Top Losers

**Phase 3**

- Redis Cache
- WebSocket live updates
- Notifications
- Email Alerts

**Phase 4**

- AI Prediction Module
- Stock Recommendation Engine
- Sentiment Analysis
- News Analysis

**Resume Project Title**

**TradeX: Virtual Stock Trading Simulator Using Spring Boot, React, JWT Authentication and PostgreSQL**

This is a strong project because it naturally forces you to implement almost every important Spring Boot concept that companies ask in interviews. It is much better for learning than a basic Employee Management or Library Management system.