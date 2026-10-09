import { Icon } from '@/components/ui/Icon';
import { Eyebrow } from '@/components/ui';

export default function AuthAside({ register = false }: { register?: boolean }) {
  return <aside className="auth-aside"><div><Eyebrow light>{register ? 'Join the community' : 'Welcome back'}</Eyebrow><h2>{register ? 'A better opportunity starts here.' : 'Find connection. Build confidence.'}</h2><p>{register ? 'Create a profile that opens the door to meaningful work and trustworthy connections.' : 'One place to manage your opportunities, applications, and next steps.'}</p></div><div className="space-y-4"><div className="auth-promise"><Icon name="shield-check" size={19}/> Admin-reviewed public listings</div><div className="auth-promise"><Icon name="check-circle" size={19}/> Simple, transparent workflows</div><div className="auth-promise"><Icon name="heart" size={19}/> Built for people first</div></div></aside>;
}
