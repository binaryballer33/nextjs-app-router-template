"use client"

import type { ContactRequest } from "@/types/forms/contact"

import { ContactRequestSchema, defaultValues } from "@/types/forms/contact"

import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"

import Form from "@/components/react-hook-form/form-provider"
import CustomInput from "@/components/react-hook-form/rhf-custom-input"

export default function ContactPage() {
    const form = useForm<ContactRequest>({ defaultValues, resolver: zodResolver(ContactRequestSchema) })

    const onSubmit = form.handleSubmit(async (values) => {
        // Here you would typically send the form data to your server
        console.log(values)
        toast.success("We've received your message and will get back to you soon.")
        form.reset()
    })

    return (
        <main className="flex-1">
            <section className="w-full py-12 md:py-24 lg:py-32">
                <div className="container px-4 md:px-6">
                    {/* Contact Form Header */}
                    <div className="flex flex-col items-center space-y-4 text-center">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                Contact Us
                            </h1>
                            <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                                We'd love to hear from you. Please fill out the form below or use our contact
                                information.
                            </p>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
                        <div className="space-y-4">
                            <Form form={form} onSubmit={onSubmit}>
                                <CustomInput inputName="name" label="Name" />
                                <CustomInput inputName="email" label="Email" />
                                <FormField
                                    control={form.control}
                                    name="message"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Message</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    className="resize-none bg-accent"
                                                    placeholder="Your message"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Please provide as much detail as possible.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button className="my-4 w-full" type="submit">
                                    Send Message
                                </Button>
                            </Form>

                            <div className="space-y-2">
                                <h2 className="text-xl font-bold">Contact Information</h2>
                                <p>Email: contact@acmeinc.com</p>
                                <p>Phone: (813) 123-4567</p>
                                <p>Address: Tampa, FL 33602</p>
                            </div>
                        </div>

                        {/* Google Maps */}
                        <div className="space-y-4">
                            <div className="h-full">
                                <div className="relative h-full min-h-[500px]">
                                    <iframe
                                        allowFullScreen
                                        className="absolute inset-0 h-full w-full"
                                        height="100%"
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112752.73077028561!2d-82.52384136722392!3d27.947423949561513!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88c2b782b3b9d1e1%3A0xa75f1389af96b463!2sTampa%2C%20FL!5e0!3m2!1sen!2sus!4v1710095169522!5m2!1sen!2sus"
                                        style={{ border: 0 }}
                                        title="Google Maps"
                                        width="100%"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}
