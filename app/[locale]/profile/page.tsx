"use client";

import { Input } from "@/components/ui/input";
import useUserStore from "@/store/user-store";
import { useTranslations } from "next-intl";
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
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { axios } from "@/hooks/use-fetch";

const formSchema = z.object({
  email: z.email(),
  nickname: z.string().max(50, "Nickname must be at most 50 characters long"),
});

const Profile = () => {
  const t = useTranslations();
  const user = useUserStore((state) => state);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: user.email,
      nickname: user.nickname || t("anonymous"),
    },
  });

  useEffect(() => {
    form.reset({
      email: user.email,
      nickname: user.nickname || t("anonymous"),
    });
  }, [user.email, user.nickname]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await axios.put("/user/update", {
      email: values.email,
      nickName: values.nickname,
    });

    await user.login();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("email")}</FormLabel>
              <FormControl>
                <Input {...field} value={user.email} disabled />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nickname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("nick name")}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{t("save")}</Button>
      </form>
    </Form>
  );
};

export default Profile;
