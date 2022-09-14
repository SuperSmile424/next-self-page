import type { GetStaticProps, NextPage } from "next";
import { type ICommitsData, getCommits } from "@libs/graphql";
import { useLocaleParser } from "@libs/localeParser";
import { Link } from "@components/Utils/Link";
import { Layout } from "@components/Layout";
import { CONFIG } from "@libs/config";

export interface IChangelogProps {
	commitsData: ICommitsData;
}

const ChangelogPage: NextPage<IChangelogProps> = ({ commitsData }) => {
	const parser = useLocaleParser();

	return (
		<Layout title={parser.get("changelog")}>
			<div className="leading-normal tracking-normal min-h-screen">
				<div className="container w-full md:max-w-3xl mx-auto">
					<div className="w-full text-xl text-gray-800 leading-normal">
						<div className="font-sans">
							<h1 className="font-bold font-sans break-normal text-black dark:text-white pt-6 pb-2 text-3xl md:text-4xl">
								{parser.get("changelog")}
							</h1>
							<p className="text-sm md:text-base font-normal text-gray-500">
								{parser.get("last_commit", {
									date: commitsData.latest,
								})}
							</p>
						</div>
						<div className="container text-black dark:text-white prose">
							<p
								dangerouslySetInnerHTML={{
									__html: parser.get(
										"changelog_description",
										{
											link: `<a rel="noreferrer" target="_blank" href="https://github.com/${
												CONFIG.SOURCE.username
											}/${
												CONFIG.SOURCE.repo
											}">${parser.get("here")}</a>`,
										},
									),
								}}
							/>
							<h2>{parser.get("last_30_commit")}</h2>
							<ul>
								{Object.keys(commitsData.commits).map(
									(date, idx) => {
										const commits =
											commitsData.commits[date];
										return (
											<li key={idx}>
												{date}
												<ul>
													{commits.map(
														(commit, idx) => (
															<li key={idx}>
																<Link
																	href={
																		commit.commitUrl
																	}
																>
																	{
																		commit.message
																	}
																</Link>{" "}
																by{" "}
																{
																	commit
																		.author
																		.name
																}
															</li>
														),
													)}
												</ul>
											</li>
										);
									},
								)}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default ChangelogPage;

export const getStaticProps: GetStaticProps<IChangelogProps> = async () => {
	const commitsData = await getCommits();

	return {
		props: {
			commitsData,
		},
		revalidate: CONFIG.REVALIDATION,
	};
};
