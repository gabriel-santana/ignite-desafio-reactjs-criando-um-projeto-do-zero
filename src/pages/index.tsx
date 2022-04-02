import { GetStaticProps } from 'next';
import Prismic from '@prismicio/client'
import { getPrismicClient } from '../services/prismic';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { FiCalendar, FiUser } from 'react-icons/fi';
import  Head  from 'next/head';
import Link from 'next/link';
//import commonStyles from '../styles/common.module.scss';
//import styles from './home.module.scss';


interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home({ postsPagination }: HomeProps) {
 return (
  <>
    <Head>
      <title>Home</title>
    </Head>

    <main>
      <div  >
        { postsPagination.results.map(post => (
          <Link key={post.uid} href={`${post.uid}`}>
            <a>
              <h1>{post.data.title}</h1>
              <p>{post.data.subtitle}</p>
              <div>
                <span><FiCalendar/>{post.first_publication_date}</span>
                <span><FiUser/>{post.data.author}</span>
              </div>
            </a>
          </Link>
        )) }
        
      </div>
    </main>
  </>
 )
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query([
    Prismic.predicates.at('document.type', 'posts')
  ], {
    fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
    pageSize: 100,
  })


  const results = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: format(
        new Date(post.first_publication_date),
        "dd MMM yyyy",
        {
          locale: ptBR,
        }
      ),
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author
      }
    }
  })

  return {
    props: { 
      postsPagination: {
        next_page: 'aaaa',
        results
      }
    }
  }
};
