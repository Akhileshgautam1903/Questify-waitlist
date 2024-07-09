// app/page.js
'use client';

import { z } from 'zod';
import { Bricolage_Grotesque } from 'next/font/google'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast';
import Image from 'next/image';

const gro = Bricolage_Grotesque({ weight : ['600','800'], subsets: ['latin']})

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid Email."
  })
})

export default function Home() {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  })

  const { toast } = useToast();

  const handleSubmit = async (data) => {
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (result.success) {
        form.reset();
        console.log(data)
        //console.log('Thank you for joining the waitlist!');
        toast({
          title: 'Email sent successfully!!',
        description: 'Thank you so much for joining the waitlist, this is a proof that I am building something nice. 🤓 You will recieve an email when Questify is live.'
        })
      } else {
        //console.log(result.error || 'Something went wrong. Please try again.');
        toast({
          title: 'Something went wrong. Please try again!',
          description: 'Ps. I think this email is already registered, pls try with different email. 😬'
        })
      }
    } catch (error) {
      console.log(error,'Something went wrong. Please try again.');
      toast({
        title: 'Something went wrong. Please try again.',
        description: "Ps. So sorry for that, that's on me 😅!!"
      })
    }
  };

  return (
    <main>
      <h1 className={`text-center ${gro.className} font-black text-3xl my-7`}>Questify</h1>
      <Form {...form}>
        <div className='h-[80vh] flex flex-col justify-center items-center'>
          <h3 className={`text-center ${gro.className} font-black text-4xl my-3`} >Join the waitlist for Questify</h3>
          <p className='text-center text-slate-500 mb-4'>Stop doomscrolling. Start a new hobby!!</p>
          <form onSubmit={form.handleSubmit(handleSubmit)} className='flex justify-center flex-col md:flex-row gap-4 my-2'>
            <FormField 
              control={form.control}
              name='email'
              render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter email address..." {...field} className='w-80'></Input>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
              )}
            />
            <Button type="Submit">Submit</Button>
          </form>
          <Image className='md:w-[200px] md:h-[200px]' src={'/meditation-girl.svg'} width={150} height={150} />
        </div>
      </Form>
      <Image className='absolute top-16 -left-10 -rotate-[20deg] md:w-[250px] md:h-[250px] md:left-16 md:-rotate-[20deg]' src={'/photographer.svg'} width={150} height={150} />
      <Image className='absolute top-16 -right-10 rotate-[20deg] md:w-[250px] md:h-[250px] md:right-16 md:rotate-[20deg]' src={'/illustrator.svg'} width={150} height={150} />
      <Image className='absolute bottom-14 -left-10 rotate-[20deg] md:w-[250px] md:h-[250px] md:left-16 md:rotate-[20deg]' src={'/podcast-girl.svg'} width={150} height={200} />
      <Image className='absolute bottom-14 -right-10 -rotate-[20deg] md:w-[250px] md:h-[250px] md:right-16 md:rotate-[20deg]' src={'/singing.svg'} width={150} height={150} />
      <p className='absolute bottom-2 left-2 text-xs'>Source of illustration : <a className='underline' href="https://popsy.co/illustrations">popsy.co</a></p>
    </main>
  );
}
