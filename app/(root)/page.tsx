import InterviewCard from '@/components/interview-card'
import { Button } from '@/components/ui/button'
import { dummyInterviews } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Home = () => {
	return (
		<>
			<section className='card-cta'>
				<div className='flex flex-col gap-6 ma-w-lg'>
					<h2>Get interview ready with AI power pracitce & Feedback</h2>
					<p className='text-lg'>Practice on real interview question & get instant feedback from our AI</p>
					<Button asChild className='btn-primary max-sm:w-full'>
						<Link href='/interview'>Start an Interview</Link>
					</Button>
				</div>
				<Image src='/robot.png' alt='robo-dude' width={400} height={400} />
			</section>

			<section className='flex flex-col gap-6 mt-8'>
				<h2>Your Interviews</h2>
				<div className='interviews-section'>
					{/* <p>You haven&apos;t taken any interviews yet.</p>
					 */}

					{dummyInterviews.map(interview => (
						<InterviewCard key={interview.id} {...interview} />
					))}
				</div>
			</section>

			<section className='flex flex-col gap-6 mt-8'>
				<h2>Take an Interview</h2>
				<div className='interviews-section'>
					{/* <p>There are no interviews available at the moment.</p> */}
          {dummyInterviews.map(interview => (
						<InterviewCard key={interview.id} {...interview} />
					))}
				</div>
			</section>
		</>
	)
}

export default Home
