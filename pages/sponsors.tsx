import type { GetStaticProps, NextPage } from "next";
import { type ISponsor, getSponsors } from "@libs/graphql";
import { SponsorCard } from "@components/SponsorCard";
import { useLocaleParser } from "@libs/localeParser";
import { Link } from "@components/Utils/Link";
import { Layout } from "@components/Layout";
import { CONFIG } from "@libs/config";

export interface ISponsorsPage {
	sponsors: ISponsor[];
}

const IndexPage: NextPage<ISponsorsPage> = ({ sponsors }) => {
	const parser = useLocaleParser();

	return (
		<Layout title={parser.get("sponsors")}>
			<section className="bg-white py-10 px-4 text-center text-black dark:bg-gray-900 dark:text-white">
				<h1
					className="mb-5 font-heading text-4xl font-semibold"
					dangerouslySetInnerHTML={{
						__html: parser.get("my_sponsors"),
					}}
				/>
				<p
					className="mb-10 text-xl text-gray-500"
					dangerouslySetInnerHTML={{
						__html: parser.get("github_sponsors_description", {
							link: `<a rel='noreferrer' target='_blank' href='https://github.com/sponsors/${CONFIG.GITHUB_USERNAME}' class='cursor-pointer hover:underline'>https://github.com/sponsors/${CONFIG.GITHUB_USERNAME}</a>`,
						}),
					}}
				/>
				<div className="container mx-auto mb-12">
					<div className="grid grid-cols-1 gap-4 text-left sm:grid-cols-2 md:grid-cols-3">
						{sponsors.map((sponsor, idx) => (
							<SponsorCard key={idx} sponsor={sponsor} />
						))}
					</div>
					<div className="pt-10">
						<Link href="/">
							<span className="mb-3 inline-block w-full rounded-xl bg-purple-600 py-2 px-6 font-semibold leading-loose text-white transition duration-200 hover:bg-purple-700 lg:mb-0 lg:mr-3 lg:w-auto">
								{parser.get("go_home")}
							</span>
						</Link>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default IndexPage;

export const getStaticProps: GetStaticProps<ISponsorsPage> = async () => {
	const sponsors = await getSponsors();

	return {
		props: {
			sponsors,
		},
		revalidate: CONFIG.REVALIDATION,
	};
};
