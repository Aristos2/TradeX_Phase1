Yes. Start with this **phase-wise checklist** for your stock project.

**TradeX Spring Boot Project Checklist**

**0\. Final Project Goal**

Build a **virtual stock trading platform** where:

| **User Action**    | **Meaning**               |
| ------------------ | ------------------------- |
| Register/Login     | JWT authentication        |
| Get dummy money    | ₹1,00,000 wallet          |
| View 10 stocks     | Hardcoded / seeded stocks |
| Buy stock          | Deduct wallet balance     |
| Sell stock         | Add money back            |
| View portfolio     | Holdings + profit/loss    |
| View transactions  | Buy/sell history          |
| Admin update price | Simulate market movement  |

**1\. Folder Structure**

tradex-backend/

│

├── src/main/java/com/tradex/

│ ├── TradeXApplication.java

│ │

│ ├── config/

│ │ ├── SecurityConfig.java

│ │ ├── JwtAuthenticationFilter.java

│ │ └── SwaggerConfig.java

│ │

│ ├── controller/

│ │ ├── AuthController.java

│ │ ├── StockController.java

│ │ ├── TradeController.java

│ │ ├── PortfolioController.java

│ │ └── AdminController.java

│ │

│ ├── service/

│ │ ├── AuthService.java

│ │ ├── StockService.java

│ │ ├── TradeService.java

│ │ ├── PortfolioService.java

│ │ └── JwtService.java

│ │

│ ├── repository/

│ │ ├── UserRepository.java

│ │ ├── StockRepository.java

│ │ ├── PortfolioRepository.java

│ │ └── TransactionRepository.java

│ │

│ ├── entity/

│ │ ├── User.java

│ │ ├── Stock.java

│ │ ├── Portfolio.java

│ │ └── Transaction.java

│ │

│ ├── dto/

│ │ ├── RegisterRequest.java

│ │ ├── LoginRequest.java

│ │ ├── AuthResponse.java

│ │ ├── BuyRequest.java

│ │ ├── SellRequest.java

│ │ ├── StockResponse.java

│ │ └── PortfolioResponse.java

│ │

│ ├── exception/

│ │ ├── GlobalExceptionHandler.java

│ │ ├── ResourceNotFoundException.java

│ │ ├── InsufficientBalanceException.java

│ │ └── BadRequestException.java

│ │

│ ├── enums/

│ │ ├── Role.java

│ │ └── TransactionType.java

│ │

│ └── seed/

│ └── StockDataSeeder.java

│

└── src/main/resources/

├── application.properties

└── data.sql

**2\. Phase 1: Project Setup**

| **Step** | **Task**                         | **Done** |
| -------- | -------------------------------- | -------- |
| 1        | Create Spring Boot project       | ☐        |
| 2        | Add dependencies                 | ☐        |
| 3        | Setup PostgreSQL/MySQL/H2        | ☐        |
| 4        | Configure application.properties | ☐        |
| 5        | Create base package structure    | ☐        |
| 6        | Run app successfully             | ☐        |

**Required Dependencies**

Spring Web

Spring Data JPA

Spring Security

PostgreSQL Driver / MySQL Driver / H2

Lombok

Validation

JWT Library

Springdoc OpenAPI Swagger

**3\. Phase 2: Database Entities**

| **Entity**  | **Fields**                                                     |
| ----------- | -------------------------------------------------------------- |
| User        | id, name, email, password, walletBalance, role                 |
| Stock       | id, symbol, companyName, price, sector                         |
| Portfolio   | id, user, stock, quantity, avgBuyPrice                         |
| Transaction | id, user, stock, type, quantity, price, totalAmount, createdAt |

Checklist:

| **Step** | **Task**                  | **Done** |
| -------- | ------------------------- | -------- |
| 1        | Create User entity        | ☐        |
| 2        | Create Stock entity       | ☐        |
| 3        | Create Portfolio entity   | ☐        |
| 4        | Create Transaction entity | ☐        |
| 5        | Add JPA relations         | ☐        |
| 6        | Test tables created in DB | ☐        |

**4\. Phase 3: Authentication + JWT**

| **Step** | **Task**                     | **Done** |
| -------- | ---------------------------- | -------- |
| 1        | Create RegisterRequest DTO   | ☐        |
| 2        | Create LoginRequest DTO      | ☐        |
| 3        | Create AuthResponse DTO      | ☐        |
| 4        | Create UserRepository        | ☐        |
| 5        | Add BCrypt password encoding | ☐        |
| 6        | Create register API          | ☐        |
| 7        | Create login API             | ☐        |
| 8        | Generate JWT token           | ☐        |
| 9        | Validate JWT token           | ☐        |
| 10       | Add Spring Security config   | ☐        |
| 11       | Protect private APIs         | ☐        |

APIs:

POST /api/auth/register

POST /api/auth/login

GET /api/auth/me

**5\. Phase 4: Stock Module**

Start with **10 hardcoded stocks**.

| **Step** | **Task**                    | **Done** |
| -------- | --------------------------- | -------- |
| 1        | Create StockRepository      | ☐        |
| 2        | Seed 10 stocks on app start | ☐        |
| 3        | Create StockService         | ☐        |
| 4        | Create StockController      | ☐        |
| 5        | Get all stocks API          | ☐        |
| 6        | Get stock by symbol API     | ☐        |
| 7        | Search stock API            | ☐        |

APIs:

GET /api/stocks

GET /api/stocks/{symbol}

GET /api/stocks/search?keyword=tcs

10 sample stocks:

TCS

INFY

RELIANCE

HDFCBANK

ICICIBANK

SBIN

WIPRO

ITC

LT

BHARTIARTL

**6\. Phase 5: Buy Stock**

| **Step** | **Task**                  | **Done** |
| -------- | ------------------------- | -------- |
| 1        | Create BuyRequest DTO     | ☐        |
| 2        | Validate quantity > 0     | ☐        |
| 3        | Check stock exists        | ☐        |
| 4        | Check user wallet balance | ☐        |
| 5        | Deduct money from wallet  | ☐        |
| 6        | Add stock to portfolio    | ☐        |
| 7        | Update average buy price  | ☐        |
| 8        | Save transaction history  | ☐        |
| 9        | Return success response   | ☐        |

API:

POST /api/trade/buy

Request:

{

"stockSymbol": "TCS",

"quantity": 2

}

Logic:

totalCost = stockPrice \* quantity

if walletBalance < totalCost:

throw InsufficientBalanceException

walletBalance = walletBalance - totalCost

portfolioQuantity = oldQuantity + newQuantity

avgBuyPrice = weighted average

save transaction

**7\. Phase 6: Sell Stock**

| **Step** | **Task**                                   | **Done** |
| -------- | ------------------------------------------ | -------- |
| 1        | Create SellRequest DTO                     | ☐        |
| 2        | Validate quantity > 0                      | ☐        |
| 3        | Check portfolio exists                     | ☐        |
| 4        | Check user has enough quantity             | ☐        |
| 5        | Reduce portfolio quantity                  | ☐        |
| 6        | Add money to wallet                        | ☐        |
| 7        | Save sell transaction                      | ☐        |
| 8        | Delete portfolio row if quantity becomes 0 | ☐        |

API:

POST /api/trade/sell

Request:

{

"stockSymbol": "TCS",

"quantity": 1

}

**8\. Phase 7: Portfolio Module**

| **Step** | **Task**                       | **Done** |
| -------- | ------------------------------ | -------- |
| 1        | Create PortfolioResponse DTO   | ☐        |
| 2        | Fetch logged-in user portfolio | ☐        |
| 3        | Calculate invested amount      | ☐        |
| 4        | Calculate current value        | ☐        |
| 5        | Calculate profit/loss          | ☐        |
| 6        | Show wallet balance            | ☐        |

API:

GET /api/portfolio

Response idea:

{

"walletBalance": 85000,

"investedAmount": 15000,

"currentValue": 17000,

"profitLoss": 2000,

"holdings": \[\]

}

**9\. Phase 8: Transaction History**

| **Step** | **Task**                     | **Done** |
| -------- | ---------------------------- | -------- |
| 1        | Create TransactionRepository | ☐        |
| 2        | Fetch user transactions      | ☐        |
| 3        | Add pagination               | ☐        |
| 4        | Add filter by BUY/SELL       | ☐        |
| 5        | Add sort by latest first     | ☐        |

API:

GET /api/transactions

GET /api/transactions?type=BUY

GET /api/transactions?page=0&size=10

**10\. Phase 9: Admin Module**

| **Step** | **Task**                 | **Done** |
| -------- | ------------------------ | -------- |
| 1        | Add ADMIN role           | ☐        |
| 2        | Admin add stock          | ☐        |
| 3        | Admin update stock price | ☐        |
| 4        | Admin delete stock       | ☐        |
| 5        | Admin view all users     | ☐        |

APIs:

POST /api/admin/stocks

PUT /api/admin/stocks/{symbol}/price

DELETE /api/admin/stocks/{symbol}

GET /api/admin/users

**11\. Phase 10: Error Handling**

| **Error**             | **Example**    |
| --------------------- | -------------- |
| Stock not found       | Wrong symbol   |
| User not found        | Invalid token  |
| Insufficient balance  | Cannot buy     |
| Insufficient quantity | Cannot sell    |
| Duplicate email       | Register issue |
| Invalid input         | Quantity <= 0  |

Checklist:

| **Step** | **Task**                      | **Done** |
| -------- | ----------------------------- | -------- |
| 1        | Create custom exceptions      | ☐        |
| 2        | Create GlobalExceptionHandler | ☐        |
| 3        | Return proper status codes    | ☐        |
| 4        | Return clean error JSON       | ☐        |

**12\. Phase 11: Testing With Postman**

| **Test**           | **Done** |
| ------------------ | -------- |
| Register user      | ☐        |
| Login user         | ☐        |
| Copy JWT token     | ☐        |
| Get stocks         | ☐        |
| Buy stock          | ☐        |
| Sell stock         | ☐        |
| Check portfolio    | ☐        |
| Check transactions | ☐        |
| Login admin        | ☐        |
| Update stock price | ☐        |

**13\. Phase 12: Frontend Later**

Folder:

tradex-frontend/

│

├── src/

│ ├── api/

│ │ └── axiosConfig.js

│ ├── pages/

│ │ ├── Login.jsx

│ │ ├── Register.jsx

│ │ ├── Dashboard.jsx

│ │ ├── Stocks.jsx

│ │ ├── Portfolio.jsx

│ │ └── Transactions.jsx

│ ├── components/

│ │ ├── Navbar.jsx

│ │ ├── StockCard.jsx

│ │ └── PortfolioCard.jsx

│ └── App.jsx

Frontend only after backend APIs work in Postman.

**14\. Best Build Order**

Follow this exact order:

1\. Project setup

2\. Entities

3\. Repositories

4\. Stock seed data

5\. Stock GET APIs

6\. Register/Login

7\. JWT Security

8\. Buy stock

9\. Sell stock

10\. Portfolio

11\. Transactions

12\. Admin APIs

13\. Exception handling

14\. Swagger

15\. React frontend

**15\. Final Resume Line**

**TradeX - Virtual Stock Trading Simulator built using Spring Boot, JWT Authentication, Spring Security, JPA, PostgreSQL, and React. Implemented dummy wallet, stock buying/selling, portfolio tracking, transaction history, and admin stock price management.**

Below is the **exact coding flow** you should follow.

**0\. GitHub Setup First**

mkdir tradex

cd tradex

git init

Create backend:

mkdir backend

cd backend

Create Spring Boot project from Spring Initializr, then paste files inside backend.

After project is ready:

git add .

git commit -m "Initial Spring Boot project setup"

Create GitHub repo, then:

git remote add origin <https://github.com/YOUR_USERNAME/tradex.git>

git branch -M main

git push -u origin main

**1\. Backend Coding Flow**

**Step 1: Create Packages**

Inside:

src/main/java/com/tradex/

Create:

config

controller

service

repository

entity

dto

exception

enums

seed

Commit:

git add .

git commit -m "Create backend package structure"

git push

**2\. First Code These Files**

**File 1: enums/Role.java**

package com.tradex.enums;

public enum Role {

USER,

ADMIN

}

**File 2: enums/TransactionType.java**

package com.tradex.enums;

public enum TransactionType {

BUY,

SELL

}

Commit:

git add .

git commit -m "Add role and transaction type enums"

git push

**3\. Code Entity Files**

**File 3: entity/User.java**

Fields:

id

name

email

password

walletBalance

role

createdAt

**File 4: entity/Stock.java**

Fields:

id

symbol

companyName

currentPrice

sector

**File 5: entity/Portfolio.java**

Fields:

id

user

stock

quantity

avgBuyPrice

**File 6: entity/Transaction.java**

Fields:

id

user

stock

type

quantity

price

totalAmount

createdAt

Commit:

git add .

git commit -m "Add core JPA entities"

git push

**4\. Code Repository Files**

**File 7: repository/UserRepository.java**

Methods:

findByEmail()

existsByEmail()

**File 8: repository/StockRepository.java**

Methods:

findBySymbol()

existsBySymbol()

**File 9: repository/PortfolioRepository.java**

Methods:

findByUserAndStock()

findByUser()

**File 10: repository/TransactionRepository.java**

Methods:

findByUserOrderByCreatedAtDesc()

Commit:

git add .

git commit -m "Add repository layer"

git push

**5\. Code DTO Files**

**File 11: dto/RegisterRequest.java**

name

email

password

**File 12: dto/LoginRequest.java**

email

password

**File 13: dto/AuthResponse.java**

token

email

role

**File 14: dto/BuyRequest.java**

stockSymbol

quantity

**File 15: dto/SellRequest.java**

stockSymbol

quantity

**File 16: dto/StockResponse.java**

symbol

companyName

currentPrice

sector

**File 17: dto/PortfolioResponse.java**

walletBalance

investedAmount

currentValue

profitLoss

holdings

Commit:

git add .

git commit -m "Add request and response DTOs"

git push

**6\. Code Config Files**

**File 18: config/JwtService.java**

Work:

generateToken()

extractUsername()

isTokenValid()

**File 19: config/JwtAuthenticationFilter.java**

Work:

Read Authorization header

Extract JWT

Validate token

Set authentication

**File 20: config/SecurityConfig.java**

Work:

Allow /api/auth/\*\*

Protect all other APIs

Use BCrypt

Use stateless session

Commit:

git add .

git commit -m "Add JWT security configuration"

git push

**7\. Code Service Files**

**File 21: service/AuthService.java**

Methods:

register()

login()

**File 22: service/StockService.java**

Methods:

getAllStocks()

getStockBySymbol()

searchStocks()

**File 23: service/TradeService.java**

Methods:

buyStock()

sellStock()

**File 24: service/PortfolioService.java**

Methods:

getPortfolio()

Commit:

git add .

git commit -m "Add service layer business logic"

git push

**8\. Code Controller Files**

**File 25: controller/AuthController.java**

APIs:

POST /api/auth/register

POST /api/auth/login

**File 26: controller/StockController.java**

APIs:

GET /api/stocks

GET /api/stocks/{symbol}

GET /api/stocks/search?keyword=tcs

**File 27: controller/TradeController.java**

APIs:

POST /api/trade/buy

POST /api/trade/sell

**File 28: controller/PortfolioController.java**

API:

GET /api/portfolio

**File 29: controller/TransactionController.java**

API:

GET /api/transactions

Commit:

git add .

git commit -m "Add REST controllers"

git push

**9\. Add Seed Data**

**File 30: seed/StockDataSeeder.java**

Add 10 stocks automatically when app starts:

TCS

INFY

RELIANCE

HDFCBANK

ICICIBANK

SBIN

WIPRO

ITC

LT

BHARTIARTL

Commit:

git add .

git commit -m "Add initial stock seed data"

git push

**10\. Add Exception Handling**

**File 31: exception/ResourceNotFoundException.java**

**File 32: exception/InsufficientBalanceException.java**

**File 33: exception/BadRequestException.java**

**File 34: exception/GlobalExceptionHandler.java**

Commit:

git add .

git commit -m "Add global exception handling"

git push

**11\. Testing Flow in Postman**

Test in this order:

1\. Register user

2\. Login user

3\. Copy JWT token

4\. Get all stocks

5\. Buy TCS stock

6\. Check portfolio

7\. Sell TCS stock

8\. Check transactions

9\. Update stock price as admin

10\. Check profit/loss

Use token:

Authorization: Bearer YOUR_TOKEN

**12\. Final Build Order Summary**

1\. GitHub setup

2\. Package structure

3\. Enums

4\. Entities

5\. Repositories

6\. DTOs

7\. JWT config

8\. Services

9\. Controllers

10\. Seed data

11\. Exceptions

12\. Postman testing

13\. Swagger

14\. React frontend

This order is best because you build from **database → logic → API → security → testing**.