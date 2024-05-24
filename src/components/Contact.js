"use client";

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

const locations = ["Nord- Midtjylland", "Syddanmark", "Sjælland"];

const musics = ["Pop", "Elektronisk", "Classics", "Jazz"];

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Titlen skal være mindst 2 tegn lang",
    })
    .max(100, {
      message: "Titlen må maks være 100 tegn lang",
    }),
  locations: z.array(z.boolean()).refine((v) => v.some((x) => x), {
    message: "Der skal være valgt mindst én lokation",
  }),
  musics: z.array(z.boolean()).refine((v) => v.some((x) => x), {
    message: "Der skal være valgt mindst én slags musik",
  }),
  price: z
    .string()
    .min(1, {
      message: "Prisen skal være mindst 1 tegn lang",
    })
    .refine((v) => !isNaN(Number(v)), {
      message: "Prisen skal være et tal",
    }),
  url: z.string().url({
    message: "URL'en er ikke gyldig",
  }),
  link: z.string().url({
    message: "Linket er ikke gyldigt",
  }),
  email: z.string().email({
    message: "Emailen er ikke gyldig",
  }),
});

export default function Contact() {
  const [status, setStatus] = useState("");
  // 1. Define your form.
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

  // 2. Define a submit handler.
  async function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const body = {
      ...values,
      locations: values.locations
        .map((v, i) => (v ? locations[i] : null))
        .filter((v) => v),
      musics: values.musics
        .map((v, i) => (v ? musics[i] : null))
        .filter((v) => v),
    };

    const userEmail = await sendUserConfirmationEmail(body);
    const ownerEmail = await sendOwnerConfirmationEmail(body);

    if (userEmail === "success" && ownerEmail === "success") {
      form.reset();
      setStatus("success");
      return;
    }
    setStatus("error");
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus("");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [status]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="text-white tracking-wider"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titel:</FormLabel>
              <FormControl>
                <Input placeholder="Mobildiskotek-/DJ-navn" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="locations"
          render={({ field }) => (
            <FormItem>
              {locations.map((location, index) => {
                return (
                  <FormField
                    key={index}
                    control={form.control}
                    name={`locations.${index}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{location}</FormLabel>

                        <FormControl>
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
        <FormField
          control={form.control}
          name="musics"
          render={({ field }) => (
            <FormItem>
              {musics.map((music, index) => {
                return (
                  <FormField
                    key={index}
                    control={form.control}
                    name={`musics.${index}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{music}</FormLabel>

                        <FormControl>
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

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minimumspris:</FormLabel>
              <FormControl>
                <Input placeholder="Minimumspris i danske kroner" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hjemmeside-URL:</FormLabel>
              <FormControl>
                <Input placeholder="Link til din hjemmeside" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link-URL:</FormLabel>
              <FormControl>
                <Input
                  placeholder="Specifikt til hvor du har sat et af vores links ind"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Din email:</FormLabel>
              <FormControl>
                <Input placeholder="dinemail@adresse.com" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {status && (
          <FormMessage className={cn(status === "success" && "text-green-500")}>
            {status === "success" ? "Succes!" : "Fejl! Prøv igen."}
          </FormMessage>
        )}
        <Button type="submit">Send</Button>
      </form>
    </Form>
  );
}
