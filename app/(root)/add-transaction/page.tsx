"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ExpenseSchema } from "@/lib/validations";

const Page = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof ExpenseSchema>>({
    resolver: zodResolver(ExpenseSchema),
    defaultValues: {
      name: "",
      amount: 0,
      category: "",
      mode: "",
      notes: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof ExpenseSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <section className="w-full px-6">
      <div className="flex items-center justify-between font-bold mb-8 text-xl">
        <p>Add Transaction</p>
      </div>

      <Tabs
        defaultValue="income"
        className="w-1/2 bg-white p-4 rounded-sm shadow-sm"
      >
        <TabsList className="w-full">
          <TabsTrigger
            value="income"
            className="w-1/2 data-[state=active]:bg-slate-900 data-[state=active]:text-slate-50"
          >
            Income
          </TabsTrigger>
          <TabsTrigger
            value="expense"
            className="w-1/2 data-[state=active]:bg-slate-900 data-[state=active]:text-slate-50"
          >
            Expense
          </TabsTrigger>
        </TabsList>
        <TabsContent value="income">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Name <span className="text-green-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Shawarma" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Amount <span className="text-green-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="₹" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Menubar>
                        <MenubarMenu>
                          <MenubarTrigger className="w-full text-slate-500">
                            Select Cateogry
                          </MenubarTrigger>
                          <MenubarContent className="w-full">
                            <MenubarItem>Food</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Grocery</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Outing</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Tafri</MenubarItem>
                          </MenubarContent>
                        </MenubarMenu>
                      </Menubar>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Payment Mode</FormLabel>
                    <FormControl>
                      <Menubar>
                        <MenubarMenu>
                          <MenubarTrigger className="w-full text-slate-500">
                            Select Payment Mode
                          </MenubarTrigger>
                          <MenubarContent className="w-full">
                            <MenubarItem>Cash</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>UPI</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Card</MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem>Other</MenubarItem>
                          </MenubarContent>
                        </MenubarMenu>
                      </Menubar>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Add Transaction</Button>
            </form>
          </Form>
        </TabsContent>
        <TabsContent value="expense">Yahaan ayenge expenses</TabsContent>
      </Tabs>
    </section>
  );
};

export default Page;
