import { PostType } from "../../pages/posts";

export default function Post({ post }: { post: PostType }) {
  return (
    <div>
      <div className={`font-medium text-lg`}>{post.title}</div>
      <div>{post.body}</div>
      <div>{post.user}</div>
    </div>
  );
}
