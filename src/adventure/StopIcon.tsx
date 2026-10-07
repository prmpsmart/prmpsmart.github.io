import {
  FiActivity,
  FiCommand,
  FiCpu,
  FiFileText,
  FiGlobe,
  FiMonitor,
  FiSmartphone,
  FiTerminal,
  FiZap,
} from 'react-icons/fi';
import type { StopId } from './stops';

const ICONS: Record<StopId, React.ReactNode> = {
  mobile: <FiSmartphone />,
  desktop: <FiMonitor />,
  architecture: <FiCpu />,
  terminal: <FiTerminal />,
  shortcuts: <FiCommand />,
  bilingual: <FiGlobe />,
  'case-studies': <FiFileText />,
  pulse: <FiActivity />,
  feel: <FiZap />,
};

export default function StopIcon({ id }: { id: StopId }) {
  return <>{ICONS[id]}</>;
}
