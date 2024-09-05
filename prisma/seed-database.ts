/* eslint-disable */
import fs from "fs"

import { SavedItemWithoutId } from "src/models/saved-item"
import { CartItemWithoutId } from "src/models/user/cart-item"
import { YuGiOhCard } from "src/models/yu-gi-oh/yu-gi-oh"
import prisma from "src/utils/database/prisma"

const cardDataFilePath = "src/mocks/yugioh-cards.json"
const cards = JSON.parse(fs.readFileSync(cardDataFilePath, "utf-8"))
const outlookUserIdFromSupabase = "38ee85d7-a6ef-4851-937a-0dc4a989c736"
const gmailUserIdFromSupabase = "662bf319-1ef7-496a-ac33-be5299cd5f51"

async function dropTables() {
    // delete in proper order
    console.warn("Attempting To Drop Tables")

    await prisma.savedCards.deleteMany({})
    await prisma.cartItem.deleteMany({})
    await prisma.user.deleteMany({})
    await prisma.yugiohCard.deleteMany({})

    console.log("Dropped Tables Successfully\n")
}

async function batchCreateYuGiOhCards(cards: YuGiOhCard[]) {
    console.log("Attempting To Create Yugioh Cards")

    cards.forEach((card) => {
        // delete the data that is not needed for the yugiohCard table, these related tables have inconsistent data in my yu-gi-oh-cards.json file and I don't have time to fix and put into a relational database
        delete card?.card_sets
        delete card?.card_images
        delete card?.card_prices
        // @ts-ignore
        delete card?.linkmarkers // TODO: figure out how to get typescript to see that this field could exist on this card
        delete card?.banlist_info
        delete card?.misc_info
    })

    const cardsBatch1 = cards.slice(0, 9999) // 9999 is the max number of records that can be inserted at once with Prisma
    const cardsBatch2 = cards.slice(9999, 14000)
    const batches = [cardsBatch1, cardsBatch2]

    batches.map(async (batch, index) => {
        try {
            const result = await prisma.yugiohCard.createMany({
                data: batch,
                skipDuplicates: true, // Optional: skips inserting records that would cause a unique constraint violation
            })
            console.log(`Successfully Inserted ${result.count} Records To YugiohCard Table\n`)
        } catch (error) {
            console.error(`Error While Inserting Records To YugiohCard Table, Failed On Batch ${index}`, error)
        }
    })
}

async function createUsersWithSupabaseUserId() {
    console.log("Attempting To Create Users")

    try {
        await prisma.user.create({
            data: {
                id: gmailUserIdFromSupabase,
                email: "shaqmandy@gmail.com",
                firstName: "Shaquille",
                lastName: "Mandy",
                encryptedPassword: "puttingFakeEncryptedPasswordHereForNowGmail",
            },
        })
        console.log("Successfully Created User with Gmail ID: ", gmailUserIdFromSupabase)
    } catch (error) {
        console.error(`Error Creating Gmail User With  ID:  ${gmailUserIdFromSupabase}`, error)
    }

    try {
        await prisma.user.create({
            data: {
                id: outlookUserIdFromSupabase,
                email: "shaqmandy@outlook.com",
                firstName: "Shaquille",
                lastName: "Mandy",
                encryptedPassword: "puttingFakeEncryptedPasswordHereForNowOutlook",
            },
        })
        console.log(`Created User with Outlook ID: ${outlookUserIdFromSupabase}\n`)
    } catch (error) {
        console.error(`Error Creating Outlook User With  ID:  ${outlookUserIdFromSupabase}`, error)
    }
}

async function createRandomSavedCards(userId: string, amountOfRandomSavedCards = 10) {
    console.log("Attempting To Create Random Saved Cards")

    const randomCards: SavedItemWithoutId[] = Array(amountOfRandomSavedCards)
        .fill({})
        .map(() => {
            const randomCard = cards[Math.floor(Math.random() * cards.length)]

            return {
                userId,
                yugiohCardId: randomCard.id,
            }
        })

    try {
        const result = await prisma.savedCards.createMany({
            data: randomCards,
            skipDuplicates: true,
        })
        console.log(`Successfully Inserted ${result.count} Records To SavedCards Table For User: ${userId}\n`)
    } catch (error) {
        console.error("Error inserting records to savedCardsTable", error)
    }
}

async function createRandomCartItems(userId: string, amountOfRandomCartItems: number = 10) {
    console.log("Attempting To Create Random Cart Items")

    const randomCards: CartItemWithoutId[] = Array(amountOfRandomCartItems)
        .fill({})
        .map(() => {
            const randomCard = cards[Math.floor(Math.random() * cards.length)]
            const { name, frameType, price, id } = randomCard
            const randomQuantity = Math.floor(Math.random() * 10.0)

            return {
                userId,
                yugiohCardId: id,
                name: name,
                price: price,
                quantity: randomQuantity,
                desc: frameType,
            }
        })

    try {
        const result = await prisma.cartItem.createMany({
            data: randomCards,
            skipDuplicates: true,
        })
        console.log(`Successfully Inserted ${result.count} Records To CartItems Table For User: ${userId}\n`)
    } catch (error) {
        console.error("Error inserting records to cartItems table", error)
    }
}

async function seedDatabase() {
    try {
        // delete all records in the tables so you can start fresh and avoid any unique constraint violations when inserting records
        await dropTables()

        //wait for tables to be dropped
        await new Promise((resolve) => setTimeout(resolve, 3000))

        await batchCreateYuGiOhCards(cards)
        await createUsersWithSupabaseUserId()

        // sometime the seed will not fully work because all the yugioh cards or users are not created yet
        await new Promise((resolve) => setTimeout(resolve, 3000))

        await createRandomSavedCards(gmailUserIdFromSupabase, 15)
        await createRandomSavedCards(outlookUserIdFromSupabase, 10)
        await createRandomCartItems(gmailUserIdFromSupabase, 15)
        await createRandomCartItems(outlookUserIdFromSupabase, 10)
    } catch (error) {
        console.error("Error Seeding Database: ", error)
    } finally {
        await prisma.$disconnect()
    }
}

seedDatabase()
    .then((_) => console.log("Database Seeded Successfully"))
    .catch((e) => console.error("Error Seeding Database", e))
