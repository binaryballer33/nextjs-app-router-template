/* eslint-disable */
import fs from "fs"

import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const cardDataFilePath = "src/mocks/yugioh-cards.json"
const cards = JSON.parse(fs.readFileSync(cardDataFilePath, "utf-8"))
const cardIds = cards.map((card) => card.id)
const outlookUserIdFromSupabase = "38ee85d7-a6ef-4851-937a-0dc4a989c736"
const gmailUserIdFromSupabase = "662bf319-1ef7-496a-ac33-be5299cd5f51"

async function dropTables() {
    // delete in proper order
    await prisma.savedCards.deleteMany({})
    await prisma.cartItem.deleteMany({})
    await prisma.user.deleteMany({})
    await prisma.yugiohCard.deleteMany({})
}

async function batchCreateYuGiOhCards(cards) {
    cards.forEach((card) => {
        // delete the data that is not needed for the yugiohCard table, its related tables with weird data I don't have time to fix
        delete card?.card_sets
        delete card?.card_images
        delete card?.card_prices
        delete card?.linkmarkers
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
            console.log(`Inserted ${result.count} records to yugiohCard table`)
        } catch (error) {
            console.error(`Error inserting records to yugiohCard table, failed on batch ${index}`, error)
        } finally {
            await prisma.$disconnect()
        }
    })
}

async function createUsersWithSupabaseUserId() {
    const gmailUser = await prisma.user.create({
        data: {
            id: gmailUserIdFromSupabase,
            email: "shaqmandy@gmail.com",
            firstName: "Shaquille",
            lastName: "Mandy",
            encryptedPassword: "puttingFakeEncryptedPasswordHereForNowGmail",
        },
    })

    console.log("Created User with Gmail ID: ", gmailUserIdFromSupabase)

    const outlookUser = await prisma.user.create({
        data: {
            id: outlookUserIdFromSupabase,
            email: "shaqmandy@outlook.com",
            firstName: "Shaquille",
            lastName: "Mandy",
            encryptedPassword: "puttingFakeEncryptedPasswordHereForNowOutlook",
        },
    })

    console.log("Created User with Outlook ID: ", outlookUserIdFromSupabase)
}

async function createRandomSavedCards(cardIds, userId, amountOfRandomSavedCards = 10) {
    const randomCards = []

    for (let i = 0; i < amountOfRandomSavedCards; i++) {
        randomCards.push({ id: cardIds[Math.floor(Math.random() * cardIds.length)] })
    }


    randomCards.forEach((card) => {
        card.userId = userId
        card.yugiohCardId = card.id
        delete card?.id
    })

    try {
        const result = await prisma.savedCards.createMany({
            data: randomCards,
            skipDuplicates: true,
        })

        console.log(`Inserted ${result.count} records to savedCards table`)
    } catch (error) {
        console.error("Error inserting records to savedCardsTable", error)
    } finally {
        await prisma.$disconnect()
    }
}

async function createRandomCartItems(cardIds, userId, amountOfRandomCartItems = 10) {
    const randomCards = []

    for (let i = 0; i < amountOfRandomCartItems; i++) {
        randomCards.push({ id: cardIds[Math.floor(Math.random() * cardIds.length)] })
    }

    randomCards.forEach((card) => {
        card.quantity = Math.floor(Math.random() * 10.00)
        card.userId = userId
        card.yugiohCardId = card.id
        delete card?.id
    })

    try {
        const result = await prisma.cartItem.createMany({
            data: randomCards,
            skipDuplicates: true,
        })

        console.log(`Inserted ${result.count} records to cartItems table`)
    } catch (error) {
        console.error("Error inserting records to cartItems table", error)
    } finally {
        await prisma.$disconnect()
    }
}

async function seedDatabase() {
    // delete all records in the tables so you can start fresh and avoid any unique constraint violations when inserting records
    await dropTables()

    // sometime the seed will not fully work because all the yugioh cards are not created yet
    console.log("Waiting 3 Seconds To Clear Tables Before Inserting Records")
    await new Promise((resolve) => setTimeout(resolve, 3000))

    await batchCreateYuGiOhCards(cards)
    await createUsersWithSupabaseUserId()

    // sometime the seed will not fully work because all the yugioh cards are not created yet
    console.log("Waiting 3 Seconds For The Yugioh Cards And Users To Be Created Before Inserting Records")
    await new Promise((resolve) => setTimeout(resolve, 3000))

    await createRandomSavedCards(cardIds, gmailUserIdFromSupabase, 15)
    await createRandomSavedCards(cardIds, outlookUserIdFromSupabase, 10)
    await createRandomCartItems(cardIds, gmailUserIdFromSupabase, 15)
    await createRandomCartItems(cardIds, outlookUserIdFromSupabase, 10)
}

await seedDatabase()