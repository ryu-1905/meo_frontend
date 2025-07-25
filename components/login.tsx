"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useTranslations } from "next-intl";
import { Separator } from "./ui/separator";
import { Checkbox } from "./ui/checkbox";
import { useState } from "react";
import { Label } from "./ui/label";

const LoginOrRegisterForm = () => {
  const t = useTranslations();
  const [haveNotAccount, setHaveNotAccount] = useState(false);

  const formSchema = z
    .object({
      email: z.email(),
      password: z.string().min(1),
      confirmPassword: z.string().min(1).optional(),
    })
    .refine(
      (data) =>
        haveNotAccount === false || data.password === data.confirmPassword,
      {
        message: "Passwords don't match",
        path: ["confirmPassword"],
      }
    );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" aria-label={t("login")}>
          {t("login").toUpperCase()}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {t("login or register (if you don't have an account)")}
          </DialogTitle>
        </DialogHeader>
        <Separator className="p-2" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("email")}: </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="email@gmail.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("password")}: </FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Label>
              <Checkbox
                checked={haveNotAccount}
                onCheckedChange={() => setHaveNotAccount(!haveNotAccount)}
              />
              {t("have not account")}
            </Label>
            {haveNotAccount ? (
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("confirm password")}: </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              ""
            )}

            <Button type="submit">
              {haveNotAccount ? t("register") : t("login")}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginOrRegisterForm;
