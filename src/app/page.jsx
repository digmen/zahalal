import { API_URL } from '@/api/Api';
import BurgerMenu from '@/components/shared/BurberMenu';
import Card from '@/components/shared/Card';
import Carousel from '@/components/shared/Carousel';
import Categories from '@/components/shared/Categories';
import MainPageSearch from '@/components/shared/MainPageSearch';
import NewsCard from '@/components/shared/NewsCard';
import Type from '@/components/shared/Type';

export default async function Page({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const selectedTypeId = resolvedSearchParams?.type || null;

  // 1. Получаем список категорий
  const categoriesRes = await fetch(`${API_URL}categories/`, {
    cache: 'no-cache',
  });

  const categoriesData = await categoriesRes.json();
  // const firstCategoryId = categoriesData?.[0]?.id?.toString();

  // 2. Определяем выбранную категорию
  const firstCategoryId = categoriesData && categoriesData.length > 0 ? categoriesData[0].id.toString() : null;
  const selectedCatId = resolvedSearchParams?.cat || firstCategoryId;

  if (selectedCatId === 'news') {
    // 1. Получаем новости
    const newsRes = await fetch(`${API_URL}news/`, { cache: 'no-cache' });
    const newsData = await newsRes.json();

    return (
      <main className='max-w-[1200px] mx-auto my-0 max-xl:max-w-[960px]'>
        <header>
          <BurgerMenu selectedCatId={selectedCatId} />
        </header>
        <MainPageSearch searchParams={resolvedSearchParams} />
        <article className='mt-8 gap-9 flex items-start justify-between lg:gap-4 max-lg:px-6 max-sm:px-4'>
          <Categories selectedCatId={selectedCatId} />
          <section className='flex flex-col gap-6 w-full my-[50px]'>
            <section className='flex flex-col gap-6 w-full'>
              <NewsCard cards={newsData} />
            </section>
          </section>
        </article>
      </main>
    );
  }

  if (!selectedCatId) {
    return (
      <main className='max-w-[1200px] mx-auto my-0 max-xl:max-w-[960px]'>
        <article className='flex flex-col items-center justify-center h-screen'>
          <h1 className='text-center text-2xl font-bold mt-10'>Данных нет</h1>
        </article>
      </main>
    )
  }

  // 3. Получаем карточки
  const cardsUrl = selectedTypeId
    ? `${API_URL}cards/types/cards/?cat_id=${selectedCatId}&type_id=${selectedTypeId}`
    : `${API_URL}cards/?cat_id=${selectedCatId}`;
  const cardsRes = await fetch(cardsUrl, { cache: 'no-cache' });
  console.log(cardsUrl);

  const cardsData = await cardsRes.json();

  // 4. Получаем типы
  const typesRes = await fetch(`${API_URL}cards/types?cat_id=${selectedCatId}`, { cache: 'no-cache' });
  console.log(typesRes);

  const typesData = await typesRes.json();

  // 5. Получаем избранные карточки
  const featured = await fetch(`${API_URL}cards/featured?card__category=${selectedCatId}`, {
    cache: 'no-cache',
  });
  const featuredData = await featured.json();

  return (
    <main className='max-w-[1200px] mx-auto my-0 max-xl:max-w-[960px]'>
      <header>
        <BurgerMenu selectedCatId={selectedCatId} />
      </header>
      <MainPageSearch searchParams={resolvedSearchParams} />
      <article className='mt-8 gap-9 flex items-start justify-between lg:gap-4 max-lg:px-6 max-sm:px-4'>
        <Categories selectedCatId={selectedCatId} />
        <section className='flex flex-col gap-6 w-full my-[50px]'>
          <Carousel featuredData={featuredData.results} />
          <section className='flex flex-col gap-6 w-full'>
            <Type typeData={typesData} selectedIdCategories={selectedCatId} selectedTypeId={selectedTypeId} />
            <Card cards={cardsData.results} />
          </section>
        </section>
      </article>
    </main>
  );
}
