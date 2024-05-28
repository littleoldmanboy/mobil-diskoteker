"use client";

// Import necessary libraries and components
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "./ui/checkbox";
import {
  sendOwnerConfirmationEmail,
  sendUserConfirmationEmail,
} from "@/actions/email.actions";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// Define array of locations and music styles
const locations = ["Nord- Midtjylland", "Syddanmark", "Sjælland"];
const musics = ["Pop", "Elektronisk", "Classics", "Jazz"];

// Define form schema using Zod for validation
const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Titlen skal indeholde mindst 2 tegn",
    })
    .max(100, {
      message: "Titlen må maks indeholde 100 tegn",
    }),
  locations: z.array(z.boolean()).refine((v) => v.some((x) => x), {
    message: "Der skal vælges mindst ét område",
  }),
  musics: z.array(z.boolean()).refine((v) => v.some((x) => x), {
    message: "Der skal vælges mindst én musikstilart",
  }),
  price: z
    .string()
    .min(1, {
      message: "Prisen skal indeholde mindst 1 tegn",
    })
    .refine((v) => !isNaN(Number(v)), {
      message: "Prisen skal være et tal",
    }),
  url: z.string().url({
    message: "URL'en er ikke gyldig",
  }),
  link: z
    .string()
    .url({
      message: "Linket er ikke gyldigt",
    })
    .optional()
    .or(z.literal("").transform(() => undefined)),
  email: z.string().email({
    message: "Emailen er ikke gyldig",
  }),
});

// Contact component definition
export default function Contact() {
  // State for form submission status
  const [status, setStatus] = useState("");
  // Define form using react-hook-form
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      locations: locations.map(() => false),
      musics: musics.map(() => false),
      price: "",
      url: "",
      link: "",
      email: "",
    },
  });

  // Submit handler function
  async function onSubmit(values) {
    // Prepare form data for submission
    const body = {
      ...values,
      locations: values.locations
        .map((v, i) => (v ? locations[i] : null))
        .filter((v) => v),
      musics: values.musics
        .map((v, i) => (v ? musics[i] : null))
        .filter((v) => v),
    };

    // Send confirmation emails to user and owner
    const userEmail = await sendUserConfirmationEmail(body);
    const ownerEmail = await sendOwnerConfirmationEmail(body);

    // Check if emails were sent successfully
    if (userEmail === "success" && ownerEmail === "success") {
      // Reset form and set success status
      form.reset();
      setStatus("success");
      return;
    }
    // Set error status if emails were not sent successfully
    setStatus("error");
  }

  // Effect hook to clear status after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus("");
    }, 4000);

    // Clean up timer on unmount
    return () => {
      clearTimeout(timer);
    };
  }, [status]);

  // Render the contact form
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="text-white tracking-wider flex flex-col"
      >
        {/* Render form fields */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="relative flex flex-col sm:flex-row items-baseline gap-3">
              <FormLabel>Titel:</FormLabel>
              <FormControl>
                <Input placeholder="Mobildiskotek-/DJ-navn" {...field} />
              </FormControl>

              <FormMessage className="absolute -bottom-5 right-0" />
            </FormItem>
          )}
        />

        {/* Render location checkboxes */}
        <FormField
          control={form.control}
          name="locations"
          render={({ field }) => (
            <FormItem className="my-7">
              <p className="mb-4">Område(r):</p>
              <div className="flex flex-col gap-3">
                {locations.map((location, index) => {
                  return (
                    <FormField
                      key={index}
                      control={form.control}
                      name={`locations.${index}`}
                      render={({ field }) => (
                        <FormItem className="ml-8 flex gap-2 items-end">
                          <FormLabel className="text-[13px] opacity-90">
                            {location}
                          </FormLabel>

                          <FormControl className="-translate-y-[1px]">
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  );
                })}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Render music genre checkboxes */}
        <FormField
          control={form.control}
          name="musics"
          render={({ field }) => (
            <FormItem className="mb-7">
              <p className="mb-4">Musikstilart(er):</p>
              {musics.map((music, index) => {
                return (
                  <FormField
                    key={index}
                    control={form.control}
                    name={`musics.${index}`}
                    render={({ field }) => (
                      <FormItem className="ml-8 flex gap-2 items-end">
                        <FormLabel className="text-[13px] opacity-90">
                          {music}
                        </FormLabel>
                        <FormControl className="-translate-y-[1px]">
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
              })}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Render price input field */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="relative flex flex-col sm:flex-row items-baseline gap-3 mb-7">
              <FormLabel className="min-w-fit">Minimumspris:</FormLabel>
              <FormControl>
                <Input placeholder="Minimumspris i danske kroner" {...field} />
              </FormControl>

              <FormMessage className="absolute -bottom-5 right-0" />
            </FormItem>
          )}
        />

        {/* Render URL input field */}
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem className="relative flex flex-col sm:flex-row items-baseline gap-3">
              <FormLabel className="min-w-fit">Hjemmeside-URL:</FormLabel>
              <FormControl>
                <Input placeholder="Link til din hjemmeside" {...field} />
              </FormControl>

              <FormMessage className="absolute -bottom-5 right-0" />
            </FormItem>
          )}
        />

        {/* Render link input field */}
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem className="relative flex flex-col sm:flex-row items-baseline gap-3 mt-4">
              <FormLabel className="min-w-fit">Link-URL:</FormLabel>
              <FormControl>
                <Input
                  placeholder="Specifikt til hvor du har sat et af vores links ind"
                  {...field}
                />
              </FormControl>

              <FormMessage className="absolute -bottom-5 right-0" />
            </FormItem>
          )}
        />

        {/* Render email input field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="relative flex flex-col sm:flex-row items-baseline gap-3 mt-4">
              <FormLabel className="min-w-fit">Din email:</FormLabel>
              <FormControl>
                <Input placeholder="dinemail@adresse.com" {...field} />
              </FormControl>

              <FormMessage className="absolute -bottom-5 right-0" />
            </FormItem>
          )}
        />

        {/* Render status message */}
        {status && (
          <FormMessage
            className={cn(status === "success" && "text-white mx-auto mt-6")}
          >
            {status === "success" ? "Succes!" : "Fejl! Prøv igen."}
          </FormMessage>
        )}

        {/* Render submit button */}
        <Button className="mx-auto w-fit mt-6" type="submit">
          Send
        </Button>
      </form>
    </Form>
  );
}
