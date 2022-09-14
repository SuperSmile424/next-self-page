/* eslint-disable no-mixed-spaces-and-tabs */
import { Layout } from "@components/Layout";
import { getPostData, IPostData } from "@libs/graphql";
import { GetServerSideProps, GetServerSidePropsResult, NextPage } from "next";
import { Giscus } from "@giscus/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "@components/Link";
import { CONFIG } from "@libs/config";
import { useTheme } from "next-themes";

export interface IPostProps {
	post: IPostData;
}

const PostPage: NextPage<IPostProps> = ({ post }) => {
	const { theme } = useTheme();

	return (
		<Layout title={post.title}>
			<div className="leading-normal tracking-normal min-h-screen">
				<div className="container w-full md:max-w-3xl mx-auto pt-20">
					<div className="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal">
						<div className="font-sans">
							<p className="text-base md:text-sm text-purple-500 font-bold">
								<FontAwesomeIcon icon={faLongArrowAltLeft} />{" "}
								<Link
									href="/blog"
									underline={false}
									className="text-base md:text-sm uppercase text-purple-500 font-bold no-underline hover:underline"
								>
									Back to blog
								</Link>
							</p>
							<h1 className="font-bold font-sans break-normal text-black dark:text-white pt-6 pb-2 text-3xl md:text-4xl">
								{post.title}
							</h1>
							<p className="text-sm md:text-base font-normal text-gray-500">
								Published at {post.createdAt}
							</p>
						</div>
						<div
							className="container text-black dark:text-white prose"
							dangerouslySetInnerHTML={{ __html: post.bodyHTML }}
						/>
					</div>
					<div className="text-base md:text-sm text-gray-500 px-4 py-6">
						Tags:{" "}
						{post.labels.length
							? post.labels.map((label, idx) => (
									<Link
										key={idx}
										underline={false}
										href={`/blog/category/${label.id}`}
										className="text-black md:text-sm p-1 mx-2 rounded"
										style={{
											backgroundColor: `#${label.color}`,
										}}
									>
										{label.name}
									</Link>
							  ))
							: "No tags"}
					</div>
					<hr className="border-b-2 border-gray-700 mb-8 mx-4" />
					<div className="container p-4">
						<Giscus
							repo={`${CONFIG.BLOG.discussions.username}/${CONFIG.BLOG.discussions.repo}`}
							repoId={CONFIG.BLOG.discussions.repo_id}
							mapping="number"
							term={post.number.toString()}
							reactionsEnabled="1"
							theme={theme == "dark" ? "dark_dimmed" : "light"}
							emitMetadata="1"
						/>
					</div>
					<hr className="border-b-2 border-gray-700 mb-8 mx-4" />
				</div>
			</div>
		</Layout>
	);
};

export default PostPage;

export const getServerSideProps: GetServerSideProps = async (
	ctx,
): Promise<GetServerSidePropsResult<IPostProps>> => {
	const id = ctx.params.id as string;
	try {
		const post = await getPostData(parseInt(id));
		return {
			props: {
				post,
			},
		};
	} catch (e) {
		return {
			redirect: {
				statusCode: 307,
				destination: "/404",
			},
		};
	}
};
