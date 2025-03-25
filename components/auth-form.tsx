'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'

import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'
import FormField from './form-field'
import { useRouter } from 'next/navigation'

const authFormSchema = (type: FormType) => {
	return z.object({
		name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
		email: z.string().email(),
		password: z.string().min(3),
	})
}

const AuthForm = ({ type }: { type: FormType }) => {
	const router = useRouter()
	const formSchema = authFormSchema(type)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	})

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			if (type === 'sign-up') {
				toast.success('Account created successfully. Please sign in.')

				router.push('/sign-in')
			} else {
                toast.success('Sign in successful. Welcome back!')

				router.push('/')
				
			}
		} catch (error) {
			console.log(error)
			toast.error(`There was en error: ${error}`)
		}
	}

	const isSignIn = type === 'sign-in'

	return (
		<div className='card-border lg:min-w-[566px]'>
			<div className='flex flex-col gap-6 card py-14 px-10'>
				<div className='flex flex-row gap-2 justify-center'>
					<Image src='/logo.svg' alt='logo' width={32} height={38} />
					<h2 className='text-primary-100'>PrepWise</h2>
				</div>
				<h3 className='text-center'>Practice job interviewing with AI</h3>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6 mt-4 form'>
						{!isSignIn && <FormField control={form.control} label='Name' name='name' placeholder='Your name' />}
						<FormField control={form.control} label='Email' name='email' placeholder='Your name' />

						<FormField
							control={form.control}
							label='Password'
							name='password'
							placeholder='Enter your password'
							type='password'
						/>

						<Button className='btn' type='submit'>
							{isSignIn ? 'Sign In' : 'Create an account'}
						</Button>
					</form>
				</Form>

				<div className='text-center'>
					{isSignIn ? "Don't have an account?" : 'Already have an account?'}
					<Link className='font-bold text-user-primary ml-1' href={!isSignIn ? '/sign-in' : '/sign-up'}>
						{!isSignIn ? 'Login' : 'Create an account'}
					</Link>
				</div>
			</div>
		</div>
	)
}

export default AuthForm
