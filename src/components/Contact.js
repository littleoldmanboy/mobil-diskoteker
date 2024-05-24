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

const locations = ["København", "Aarhus", "Odense"];

const musics = ["Pop", "Rock", "Rap", "Techno"];

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
    message: "Der skal være mindst ét valgt område",
  }),
  musics: z.array(z.boolean()).refine((v) => v.some((x) => x), {
    message: "Der skal være mindst én valgt stilart",
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
  function onSubmit(values) {
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
    console.log(body);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 text-white"
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
                <Input placeholder="Mobildiskotek-/DJ-navn" {...field} />
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
                <Input placeholder="Mobildiskotek-/DJ-navn" {...field} />
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
                <Input placeholder="Mobildiskotek-/DJ-navn" {...field} />
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
                <Input placeholder="Mobildiskotek-/DJ-navn" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Send</Button>
      </form>
    </Form>
  );
}
