import {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next"
import { client } from "libs/client"
import type { Blog } from "types/blog"

type Params = {
  id: string
};

// APIリクエストを行うパスを指
export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const data = await client.get({ endpoint: "blog" })
  const paths = data.contents.map((content:Blog) => `/blog/${content.id}`)
  // console.log(paths)
  return { paths, fallback: false }
};

// microCMSへAPIリクエスト
export const getStaticProps: GetStaticProps<Props, Params> = async (context) => {
  console.log(context)
  const id = context.params?.id
  const data = await client.get({ endpoint: "blog", contentId: id })

  return {
    props: {
      blog: data,
    },
  }
}

// Props（blog）の型
type Props = {
  blog: Blog
};

const BlogId: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  blog,
}: Props) => {
  return (
    <main>
      <h1>{blog.title}</h1>
      <p>{blog.publishedAt}</p>
			{blog.tags.map((tag) => (
        <li key={tag.id}>
          #{tag.tag}
        </li>
      ))}
      <div
        dangerouslySetInnerHTML={{
          __html: `${blog.body}`,
        }}
      />
    </main>
  )
}
export default BlogId