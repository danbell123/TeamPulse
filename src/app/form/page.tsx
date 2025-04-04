import dynamic from 'next/dynamic';

const SurveyComponent = dynamic(() => import('@/components/Survey'), {
  ssr: false, // prevents Next.js from trying to render on the server
});

export default function Page() {
  return (
    <div>
      <SurveyComponent />
    </div>
  );
}
