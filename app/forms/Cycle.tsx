"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { format } from "date-fns";
import { CalendarDays } from "lucide-react";
// @ts-ignore
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createCycle, getCurrentCycle } from "@/lib/actions/cycle.action";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  date: z.object({
    from: z.date(),
    to: z.date(),
  }),
  budget: z
    .string()
    .transform((v) => Number(v) || 0)
    .pipe(z.number().min(1)),
});

interface props {
  className?: React.HTMLAttributes<HTMLDivElement>;
  mongoUser: string;
}

export function Cycle({ className, mongoUser }: props) {
  const [date, setDate] = useState<DateRange | undefined>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // let isoToDate: typeof date;
  // let isoFromDate: typeof date;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      date: {},
      budget: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    console.log(values);
    setIsSubmitting(true);
    console.log(mongoUser);

    try {
      if (await getCurrentCycle({ userId: JSON.parse(mongoUser) }))
        return console.log("Cycle already exists");

      await createCycle({
        from: values.date.from,
        to: values.date.to,
        budget: values.budget,
        user: JSON.parse(mongoUser),
      });

      router.push("/");
    } catch (error) {
      console.log(error);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
    // console.log(isoFromDate, isoToDate);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-4">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Cycle Range</FormLabel>
              <div className={cn("grid gap-2", className)}>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        " justify-start text-left font-normal w-full dark:bg-black",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarDays className="mr-2 h-4 w-4" />
                      {field.value?.from ? (
                        field.value.to ? (
                          <>
                            {format(field.value.from, "LLL dd, y")} -{" "}
                            {format(field.value.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(field.value.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Select cycle range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={field.value?.from}
                      selected={field.value}
                      onSelect={field.onChange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              {/* <FormDescription>
                Your date of birth is used to calculate your age.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="budget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Budget</FormLabel>
              <FormControl>
                <Input placeholder="₹" {...field} className="dark:bg-black" />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        {/* <SheetClose asChild> */}
        <Button type="submit">Submit</Button>
        {/* </SheetClose> */}
      </form>
    </Form>
  );
}
