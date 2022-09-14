import type { FC } from "react";
import type { IPost } from "@libs/graphql";
import { CustomImage } from "@components/Utils/CustomImage";
import { Link } from "@components/Utils/Link";
import Tilt from "react-parallax-tilt";
import { useRouter } from "next/router";
import { LocaleParser } from "@libs/localeParser";

export interface IPostCard {
	post: IPost;
}

export const PostCard: FC<IPostCard> = ({ post }) => {
	const router = useRouter();
	const parser = new LocaleParser(router.locale);

	return (
		<Tilt scale={1.05} tiltMaxAngleX={10} tiltMaxAngleY={10}>
			<div className="mt-6">
				<div className="max-w-4xl px-10 py-6 mx-auto bg-white dark:bg-gray-800 round shadow-md">
					<div className="flex items-center justify-between">
						<span className="font-light text-gray-600 dark:text-white">
							{post.createdAt}
						</span>
					</div>
					<div className="mt-2">
						<Link
							underline
							href={`/blog/post/${post.number}`}
							className="text-2xl font-bold text-gray-700 dark:text-white"
						>
							{post.title}
						</Link>
					</div>
					<div className="flex items-center justify-between mt-4">
						<Link
							underline
							href={`/blog/post/${post.number}`}
							className="text-blue-500"
						>
							{parser.get("read_more")}
						</Link>
						<div>
							<Link
								underline
								href={`https://github.com/${post.author.login}`}
								className="flex items-center"
							>
								<CustomImage
									src={post.author.avatarUrl}
									alt="avatar"
									className="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block"
								/>
								<h1 className="font-bold text-gray-700 dark:text-white">
									{post.author.login}
								</h1>
							</Link>
						</div>
					</div>
					<div>
						{post.labels.map((label, idx) => (
							<Link
								key={idx}
								href={`/blog/category/${label.id}`}
								className="p-1 m-1 text-sm text-black round"
								style={{
									backgroundColor: `#${label.color}`,
								}}
							>
								{label.name}
							</Link>
						))}
					</div>
				</div>
			</div>
		</Tilt>
	);
};
