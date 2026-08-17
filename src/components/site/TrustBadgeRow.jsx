import { Image } from '@/components/ui/image';

const BADGES = [
  { alt: 'Personalized Support', src: 'https://media.base44.com/images/public/6a6ba5b40f4a59615638b4b9/2476e733b_badge_personalized_support.png' },
  { alt: 'Easy Enrollment', src: 'https://media.base44.com/images/public/6a6ba5b40f4a59615638b4b9/0d7f08ac5_badge_easy_enrollment.png' },
  { alt: 'Secure & Private', src: 'https://media.base44.com/images/public/6a6ba5b40f4a59615638b4b9/091968bb5_badge_secure_private.png' },
];

export default function TrustBadgeRow() {
  return (
    <div className="grid grid-cols-3 gap-2.5 max-w-md">
      {BADGES.map((b) => (
        <Image key={b.alt} src={b.src} alt={b.alt} fittingType="fit" className="w-full h-12" />
      ))}
    </div>
  );
}