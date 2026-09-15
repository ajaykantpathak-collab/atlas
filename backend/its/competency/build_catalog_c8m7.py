"""Build concept catalog for Class 8 Maths Chapter 7 (Comparing Quantities).
Extracted from hemh107.txt -- NCERT Class 8 Maths textbook (Reprint 2024-25).
Note: this reprint covers ratios/percentages, discounts, sales tax/VAT/GST,
simple and compound interest; profit-loss sections are not part of this file.
"""
import json
import os

CATALOG = {
    "class": 8,
    "subject": "maths",
    "chapter": 7,
    "chapter_title": "Comparing Quantities",
    "source_file": "D:/node_generator/ncert-mcp/data/processed/text_cache/hemh107.txt",
    "concepts": [
        {
            "id": "c8m7.1.1",
            "title": "Ratios and Percentages",
            "section": "7.1",
            "definition": "Ratio means comparing two quantities, e.g. the ratio of the number of oranges to the number of apples = 5 : 20, read as 5 is to 20, simplified to 1 : 4. Percentage compares by making the denominator 100: percentage = part / whole x 100. By the unitary method, out of 100 items the count is part x 100 / whole.",
            "formula": "percentage = (part / whole) x 100; ratio a : b = a / b",
            "key_idea": "Ratio compares two quantities; percent puts the whole as 100.",
            "textbook_ref": "hemh107.txt lines 5-33",
            "question_patterns": [
                "find the ratio of",
                "find the ratio of the speed of cycle to speed of scooter",
                "convert the ratio to a percentage",
                "what per cent of the total distance",
                "find the percentage of oranges",
                "express as a ratio",
                "compare two quantities using a ratio",
                "find ratio of 50 paise to 5 rupees",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "write the ratio",
                    "explain": "Ratio = first quantity : second quantity; simplify by dividing by the common factor",
                },
                {
                    "step": 2,
                    "action": "convert to percentage",
                    "explain": "percentage = part / whole x 100",
                    "compute": "part * 100 / whole",
                },
                {
                    "step": 3,
                    "action": "convert units if needed",
                    "explain": "Make units the same before forming the ratio (paise and rupees, m and km)",
                },
            ],
        },
        {
            "id": "c8m7.1.2",
            "title": "Finding Values from Percentages (Unitary Method)",
            "section": "7.1",
            "definition": "Using the unitary method: if a given percent of the total equals a known value, then 1 percent equals value / percent, and the total (100 percent) equals value x 100 / percent. For example, 60% of x is 18 gives x = 18 x 100 / 60 = 30.",
            "formula": "total = value x 100 / percent; part of value = percent x value / 100",
            "key_idea": "Find 1 percent first, then scale to 100 percent or any percent.",
            "textbook_ref": "hemh107.txt lines 34-105",
            "question_patterns": [
                "72% of 25 students are interested in mathematics how many are not interested",
                "how many matches did they play in all if the win percentage was 40",
                "if she had 600 left after spending 75% of her money how much did she have in the beginning",
                "what per cent of the people like other games",
                "find the number from the given percentage",
                "find the total from the percentage",
                "60 girls are 60% of the total how many students",
                "what per cent of the distance is left to be covered",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "find the value of 1 percent",
                    "explain": "value for 1% = given value / given percent",
                    "compute": "value / percent",
                },
                {
                    "step": 2,
                    "action": "scale to 100 percent for the total",
                    "explain": "total = value x 100 / percent",
                    "compute": "value * 100 / percent",
                },
                {
                    "step": 3,
                    "action": "scale to any other percent",
                    "explain": "required = 1% value x required percent",
                    "compute": "value * target_percent / percent",
                },
                {
                    "step": 4,
                    "action": "subtract for the remainder",
                    "explain": "Remaining percent = 100 - given percent; remaining amount = total - found part",
                    "compute": "100 - percent",
                },
            ],
        },
        {
            "id": "c8m7.2.1",
            "title": "Finding Discounts",
            "section": "7.2",
            "definition": "Discount is a reduction given on the Marked Price (MP) of the article. It is generally given to attract customers to buy goods or to promote sales of the goods. You can find the discount by subtracting its sale price from its marked price: Discount = Marked Price - Sale Price. Since discount is on marked price, use marked price as the base for the discount percent: Discount = Discount% of Marked Price.",
            "formula": "discount = marked_price - sale_price; discount percent = discount x 100 / marked_price",
            "key_idea": "Discount is subtracted from the marked price; percent base is the marked price.",
            "textbook_ref": "hemh107.txt lines 145-163, 528-531",
            "question_patterns": [
                "an item marked at 840 is sold for 714 what is the discount and discount percent",
                "find the discount and discount per cent",
                "find the discount given",
                "a table marked at 15000 is available for 14400 find the discount given and the discount per cent",
                "what is the discount on the marked price",
                "calculate the discount percentage",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "find the discount",
                    "explain": "Discount = Marked Price - Sale Price",
                    "compute": "marked_price - sale_price",
                },
                {
                    "step": 2,
                    "action": "find the discount percent",
                    "explain": "discount percent = discount / marked price x 100 (marked price is the base)",
                    "compute": "(marked_price - sale_price) * 100 / marked_price",
                },
            ],
        },
        {
            "id": "c8m7.2.2",
            "title": "Sale Price or Marked Price from Discount Percent",
            "section": "7.2",
            "definition": "You can find the sale price when the discount percent is given: a discount of d percent means on a marked price of 100 the discount is d and the sale price is 100 - d. By the unitary method, discount = d/100 x marked price and sale price = marked price - discount. You can also find the marked price from the sale price: marked price = sale price x 100 / (100 - d).",
            "formula": "discount = marked_price x discount_percent / 100; sale_price = marked_price x (100 - discount_percent) / 100",
            "key_idea": "Discount percent applies on the marked price; subtract it to get the sale price.",
            "textbook_ref": "hemh107.txt lines 164-197",
            "question_patterns": [
                "the list price of a frock is 220 a discount of 20% is announced what is the sale price",
                "a shop gives 20% discount what would the sale price be",
                "find the amount of discount and the sale price",
                "an almirah is sold at 5225 after allowing a discount of 5% find its marked price",
                "arun bought skates where the discount given was 20% if the amount he pays is 1600 find the marked price",
                "what would a customer have to pay after the discount",
                "find the sale price after the discount",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "compute the discount amount",
                    "explain": "discount = marked price x discount percent / 100",
                    "compute": "marked_price * discount_percent / 100",
                },
                {
                    "step": 2,
                    "action": "subtract to get the sale price",
                    "explain": "sale price = marked price - discount",
                    "compute": "marked_price - marked_price * discount_percent / 100",
                },
                {
                    "step": 3,
                    "action": "to find the marked price from sale price",
                    "explain": "marked price = sale price x 100 / (100 - discount percent)",
                    "compute": "sale_price * 100 / (100 - discount_percent)",
                },
            ],
        },
        {
            "id": "c8m7.3.1",
            "title": "Sales Tax, VAT and GST",
            "section": "7.3",
            "definition": "Sales tax (ST) is charged by the government on the sale of an item. It is collected by the shopkeeper from the customer and given to the government. This is always on the selling price of an item and is added to the value of the bill. GST stands for Goods and Services Tax which is levied on supply of goods or services or both. Sales tax = Tax% of Bill amount; bill amount = cost of item + sales tax. For a price that already includes tax of r percent, original price = price x 100 / (100 + r).",
            "formula": "tax = price x tax_percent / 100; bill_amount = price + tax; original_price = final_price x 100 / (100 + tax_percent)",
            "key_idea": "Tax percent applies on the price and is added to the bill.",
            "textbook_ref": "hemh107.txt lines 212-254, 535-537",
            "question_patterns": [
                "the sales tax charged was 5% find the bill amount",
                "find the amount he will have to pay if he buys it",
                "the price includes a tax of 10% find the price before tax was added",
                "i purchased a hair dryer for 5400 including 8% VAT find the price before VAT was added",
                "an article was purchased for 1239 including GST of 18% find the price before GST was added",
                "find the bill amount including sales tax",
                "what is the price of the article before GST was added",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "compute the tax",
                    "explain": "tax = price x tax percent / 100",
                    "compute": "price * tax_percent / 100",
                },
                {
                    "step": 2,
                    "action": "add to get the bill amount",
                    "explain": "bill amount = price + tax",
                    "compute": "price + price * tax_percent / 100",
                },
                {
                    "step": 3,
                    "action": "to remove a tax already included",
                    "explain": "original price = final price x 100 / (100 + tax percent)",
                    "compute": "final_price * 100 / (100 + tax_percent)",
                },
            ],
        },
        {
            "id": "c8m7.4.1",
            "title": "Simple Interest",
            "section": "7.4",
            "definition": "Interest is the extra money paid by institutions like banks or post offices on money deposited (kept) with them. Interest is also paid by people when they borrow money. On a principal of 100, interest for 1 year at R percent is R; so simple interest = P x R x T / 100. The principal remains the same under simple interest. Amount to be paid = Principal + Interest.",
            "formula": "SI = principal x rate x time / 100; amount = principal + interest",
            "key_idea": "Simple interest is the same each year on the original principal.",
            "textbook_ref": "hemh107.txt lines 276-289, 365-366, 538",
            "question_patterns": [
                "find the simple interest on 10000 at 15% per annum for 2 years",
                "find interest and amount to be paid on 15000 at 5% per annum after 2 years",
                "calculate the simple interest",
                "find the amount to be paid at the end of the period",
                "what is the simple interest on the sum",
                "find the interest for the given years",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "compute one year interest",
                    "explain": "interest for 1 year = principal x rate / 100",
                    "compute": "principal * rate / 100",
                },
                {
                    "step": 2,
                    "action": "multiply by the number of years",
                    "explain": "SI = principal x rate x time / 100",
                    "compute": "principal * rate * time / 100",
                },
                {
                    "step": 3,
                    "action": "find the amount",
                    "explain": "amount = principal + interest",
                    "compute": "principal + principal * rate * time / 100",
                },
            ],
        },
        {
            "id": "c8m7.4.2",
            "title": "Compound Interest Year by Year",
            "section": "7.4",
            "definition": "Normally, the interest paid or charged is never simple. The interest is calculated on the amount of the previous year. This is known as interest compounded or Compound Interest (C.I.). Steps: (1) find the Simple Interest for one year; (2) find the amount, which becomes the principal for the next year; (3) again find the interest on this sum for another year; (4) find the amount at the end. The principal changes year after year under compound interest.",
            "formula": "amount of year n = amount of year n-1 + interest on it; total CI = sum of yearly interests",
            "key_idea": "Each year interest is charged on the previous year's amount.",
            "textbook_ref": "hemh107.txt lines 298-366",
            "question_patterns": [
                "find the compound interest year by year",
                "calculate the interest compounded annually step by step",
                "find the amount at the end of 2 years if interest is compounded",
                "how much more is compound interest than simple interest",
                "compound interest on 20000 at 8% for 2 years",
                "interest calculated on the amount of the previous year",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "find the first year interest",
                    "explain": "SI for year 1 = principal x rate / 100",
                    "compute": "principal * rate / 100",
                },
                {
                    "step": 2,
                    "action": "find the amount after year 1",
                    "explain": "This becomes the principal for the next year",
                    "compute": "principal + principal * rate / 100",
                },
                {
                    "step": 3,
                    "action": "repeat for each further year",
                    "explain": "Interest for the next year = previous amount x rate / 100",
                },
                {
                    "step": 4,
                    "action": "add the yearly interests",
                    "explain": "Total compound interest = sum of all yearly interests",
                },
            ],
        },
        {
            "id": "c8m7.5.1",
            "title": "Compound Interest Formula",
            "section": "7.5",
            "definition": "Suppose P is the sum on which interest is compounded annually at a rate of R% per annum. Proceeding year by year, the amount at the end of n years is A = P (1 + R/100)^n. This gives the amount; since CI = A - P, we can easily find the compound interest too.",
            "formula": "A = P (1 + R/100)^n; CI = A - P",
            "key_idea": "The compound interest amount formula uses a power of (1 + R/100).",
            "textbook_ref": "hemh107.txt lines 367-443, 538",
            "question_patterns": [
                "find CI on 12600 for 2 years at 10% per annum compounded annually",
                "find the compound interest using the formula",
                "find the amount at the end of n years",
                "what amount has to be paid if interest is compounded annually",
                "find the compound interest on a sum for 2 years at 5% per annum",
                "deduce the formula for compound interest",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "apply the amount formula",
                    "explain": "A = P (1 + R/100)^n with principal P, rate R, years n",
                    "compute": "principal * (1 + rate / 100) ** years",
                },
                {
                    "step": 2,
                    "action": "subtract the principal",
                    "explain": "CI = A - P",
                    "compute": "principal * (1 + rate / 100) ** years - principal",
                },
            ],
        },
        {
            "id": "c8m7.6.1",
            "title": "Applications: Growth and Depreciation",
            "section": "7.6",
            "definition": "There are some situations where we could use the formula for calculation of amount in CI: (i) increase (or decrease) in population; (ii) the growth of a bacteria if the rate of growth is known; (iii) the value of an item if its price increases or decreases in the intermediate years. For growth at r percent per year: population = initial x (1 + r/100)^n. Depreciation means reduction of value due to use and age of the item; value after n years = initial x (1 - r/100)^n.",
            "formula": "growth: initial x (1 + r/100)^n; depreciation: initial x (1 - r/100)^n",
            "key_idea": "Growth uses (1 + r/100)^n; depreciation uses (1 - r/100)^n.",
            "textbook_ref": "hemh107.txt lines 446-509",
            "question_patterns": [
                "the population of a city increased at 5% per annum find the population after 3 years",
                "find the bacteria at the end of 2 hours if the count is increasing at the rate",
                "the scooter was bought at 42000 its value depreciated at 8% per annum find its value after one year",
                "a machinery worth 10500 depreciated by 5% find its value after one year",
                "find the population after 2 years if the rate of increase is given",
                "depreciation in value after one year",
                "growth of population compounded annually",
            ],
            "solution_type": "compute",
            "solution_steps": [
                {
                    "step": 1,
                    "action": "for an increase",
                    "explain": "value after n years = initial x (1 + r/100)^n",
                    "compute": "initial * (1 + rate / 100) ** years",
                },
                {
                    "step": 2,
                    "action": "for a decrease (depreciation)",
                    "explain": "value after n years = initial x (1 - r/100)^n",
                    "compute": "initial * (1 - rate / 100) ** years",
                },
                {
                    "step": 3,
                    "action": "for one year only",
                    "explain": "Set n = 1: value = initial x (1 - rate/100); equivalently initial - rate percent of initial",
                },
            ],
        },
    ],
    "worked_examples": [
        {
            "id": "ex1",
            "source_ref": "hemh107.txt lines 153-163 (Example 2)",
            "concept": "c8m7.2.1",
            "question_type": "find_discount",
            "question_pattern": "an item marked at {marked_price} is sold for {sale_price}. what is the discount and discount percent",
            "extracted_variables": {
                "marked_price": "the marked price",
                "sale_price": "the sale price",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "find the discount",
                    "explain": "Discount = Marked Price - Sale Price",
                    "compute": "marked_price - sale_price",
                },
                {
                    "step": 2,
                    "action": "find the discount percent",
                    "explain": "On marked price of 100 the discount is discount x 100 / marked price",
                    "compute": "(marked_price - sale_price) * 100 / marked_price",
                },
            ],
        },
        {
            "id": "ex2",
            "source_ref": "hemh107.txt lines 165-190 (Example 3)",
            "concept": "c8m7.2.2",
            "question_type": "sale_price_from_discount",
            "question_pattern": "the list price is {marked_price} and a discount of {discount_percent}% is announced. find the discount and the sale price",
            "extracted_variables": {
                "marked_price": "the list price",
                "discount_percent": "discount percent",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "compute the discount",
                    "explain": "discount = marked price x discount percent / 100",
                    "compute": "marked_price * discount_percent / 100",
                },
                {
                    "step": 2,
                    "action": "subtract",
                    "explain": "sale price = marked price - discount",
                    "compute": "marked_price - marked_price * discount_percent / 100",
                },
            ],
        },
        {
            "id": "ex3",
            "source_ref": "hemh107.txt lines 230-238 (Example 4)",
            "concept": "c8m7.3.1",
            "question_type": "sales_tax_bill",
            "question_pattern": "the cost was {price} and the sales tax charged was {tax_percent}%. find the bill amount",
            "extracted_variables": {
                "price": "cost of the item",
                "tax_percent": "tax percent",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "compute the tax",
                    "explain": "On 100 the tax is tax percent; so tax = price x tax percent / 100",
                    "compute": "price * tax_percent / 100",
                },
                {
                    "step": 2,
                    "action": "add the tax",
                    "explain": "Bill amount = cost + sales tax",
                    "compute": "price + price * tax_percent / 100",
                },
            ],
        },
        {
            "id": "ex4",
            "source_ref": "hemh107.txt lines 239-246 (Example 5)",
            "concept": "c8m7.3.1",
            "question_type": "price_before_tax",
            "question_pattern": "the price {final_price} includes a tax of {tax_percent}%. find the price before tax was added",
            "extracted_variables": {
                "final_price": "price including tax",
                "tax_percent": "tax percent",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "set the base",
                    "explain": "A tax of r percent means price without tax 100 becomes 100 + r",
                },
                {
                    "step": 2,
                    "action": "scale down",
                    "explain": "original price = final price x 100 / (100 + tax percent)",
                    "compute": "final_price * 100 / (100 + tax_percent)",
                },
            ],
        },
        {
            "id": "ex5",
            "source_ref": "hemh107.txt lines 281-289 (Example 7)",
            "concept": "c8m7.4.1",
            "question_type": "simple_interest",
            "question_pattern": "a sum of {principal} is borrowed at a rate of {rate}% per annum for {time} years. find the simple interest and the amount",
            "extracted_variables": {
                "principal": "the sum borrowed",
                "rate": "rate percent per annum",
                "time": "number of years",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "compute one year interest",
                    "explain": "On 100 interest for 1 year is the rate; on the principal it is P x R / 100",
                    "compute": "principal * rate / 100",
                },
                {
                    "step": 2,
                    "action": "multiply by years",
                    "explain": "Interest for the given years = one year interest x time",
                    "compute": "principal * rate * time / 100",
                },
                {
                    "step": 3,
                    "action": "find the amount",
                    "explain": "Amount = Principal + Interest",
                    "compute": "principal + principal * rate * time / 100",
                },
            ],
        },
        {
            "id": "ex6",
            "source_ref": "hemh107.txt lines 428-443 (Example 8)",
            "concept": "c8m7.5.1",
            "question_type": "compound_interest_formula",
            "question_pattern": "find CI on {principal} for {years} years at {rate}% per annum compounded annually",
            "extracted_variables": {
                "principal": "the principal",
                "rate": "rate percent per annum",
                "years": "number of years",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "apply the formula",
                    "explain": "A = P (1 + R/100)^n",
                    "compute": "principal * (1 + rate / 100) ** years",
                },
                {
                    "step": 2,
                    "action": "subtract the principal",
                    "explain": "CI = A - P",
                    "compute": "principal * (1 + rate / 100) ** years - principal",
                },
            ],
        },
        {
            "id": "ex7",
            "source_ref": "hemh107.txt lines 452-485 (Example 9)",
            "concept": "c8m7.6.1",
            "question_type": "population_growth",
            "question_pattern": "the population was {initial} and increased at {rate}% p.a. find the population after {years} years",
            "extracted_variables": {
                "initial": "initial population",
                "rate": "rate of increase percent",
                "years": "number of years",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "treat population as principal",
                    "explain": "Each year the increase is rate percent of the previous year's population",
                },
                {
                    "step": 2,
                    "action": "apply the growth formula",
                    "explain": "population = initial x (1 + rate/100)^years",
                    "compute": "initial * (1 + rate / 100) ** years",
                },
            ],
        },
        {
            "id": "ex8",
            "source_ref": "hemh107.txt lines 491-509 (Example 10)",
            "concept": "c8m7.6.1",
            "question_type": "depreciation",
            "question_pattern": "a TV was bought at {initial} and depreciated by {rate}% per year. find the value after {years} year",
            "extracted_variables": {
                "initial": "purchase price",
                "rate": "rate of depreciation percent",
                "years": "number of years",
            },
            "solution_template": [
                {
                    "step": 1,
                    "action": "compute the reduction",
                    "explain": "reduction = initial x rate / 100",
                    "compute": "initial * rate / 100",
                },
                {
                    "step": 2,
                    "action": "subtract",
                    "explain": "value = initial x (1 - rate/100) for one year",
                    "compute": "initial * (1 - rate / 100) ** years",
                },
            ],
        },
    ],
    "exercises": [
        {
            "id": "ex7.1",
            "source_ref": "hemh107.txt lines 127-144 (Exercise 7.1)",
            "questions": [
                "Find the ratio of: (a) speed of a cycle 15 km per hour to the speed of scooter 30 km per hour (b) 5 m to 10 km (c) 50 paise to 5 rupees",
                "Convert the following ratios to percentages: (a) 3 : 4 (b) 2 : 3",
                "72% of 25 students are interested in mathematics. How many are not interested in mathematics?",
                "A football team won 10 matches out of the total number of matches they played. If their win percentage was 40, then how many matches did they play in all?",
                "If Chameli had 600 rupees left after spending 75% of her money, how much did she have in the beginning?",
                "If 60% people in a city like cricket, 30% like football and the remaining like other games, what per cent like other games? If the total number of people is 50 lakh, find the exact number who like each type of game",
            ],
        },
        {
            "id": "ex7.2",
            "source_ref": "hemh107.txt lines 263-274 (Exercise 7.2)",
            "questions": [
                "During a sale a shop offered a discount of 10% on the marked prices of all items. What would a customer have to pay for a pair of jeans marked at 1450 and two shirts marked at 850 each?",
                "The price of a TV is 13000. The sales tax charged on it is at the rate of 12%. Find the amount that Vinod will have to pay if he buys it",
                "Arun bought a pair of skates at a sale where the discount given was 20%. If the amount he pays is 1600, find the marked price",
                "I purchased a hair-dryer for 5400 including 8% VAT. Find the price before VAT was added",
                "An article was purchased for 1239 including GST of 18%. Find the price of the article before GST was added",
            ],
        },
        {
            "id": "ex7.3",
            "source_ref": "hemh107.txt lines 514-523 (Exercise 7.3)",
            "questions": [
                "The population of a place increased to 54000 in 2003 at a rate of 5% per annum: (i) find the population in 2001 (ii) what would be its population in 2005?",
                "In a laboratory the count of bacteria was increasing at the rate of 2.5% per hour. Find the bacteria at the end of 2 hours if the count was initially 506000",
                "A scooter was bought at 42000. Its value depreciated at the rate of 8% per annum. Find its value after one year",
            ],
        },
    ],
}


def main():
    out_dir = os.path.dirname(os.path.abspath(__file__))
    out_path = os.path.join(
        out_dir, "catalog_class8_maths_ch7_comparing_quantities.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(CATALOG, f, indent=2, ensure_ascii=True)
    print("Wrote catalog to:", out_path)
    print("Concepts:", len(CATALOG["concepts"]))
    print("Worked examples:", len(CATALOG["worked_examples"]))
    print("Exercises:", len(CATALOG["exercises"]))
    print("Total exercise questions:", sum(len(e["questions"]) for e in CATALOG["exercises"]))


if __name__ == "__main__":
    main()
