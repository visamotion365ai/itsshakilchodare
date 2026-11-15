import type { Metadata } from 'next';
import {
  Alert,
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  DataTable,
  DisclaimerStrip,
  KpiTile,
  PageHeader,
  ProgressBar,
} from '@visahobe/ui';
import { Icon } from '@/lib/icons';

export const metadata: Metadata = { title: 'Team & roles' };

type StaffRole = 'owner' | 'admin' | 'case_manager' | 'verifier' | 'finance' | 'policy_editor';

interface StaffMember {
  id: string;
  name: string;
  initials: string;
  email: string;
  role: StaffRole;
  status: 'active' | 'invited' | 'suspended';
  openCases: number;
  twoFactor: boolean;
  lastActive: string;
}

const staff: StaffMember[] = [
  {
    id: 'st_1',
    name: 'Shakil Hossain',
    initials: 'SH',
    email: 'shakil@visahobe.com',
    role: 'owner',
    status: 'active',
    openCases: 0,
    twoFactor: true,
    lastActive: '2026-11-13 08:42',
  },
  {
    id: 'st_2',
    name: 'Ayesha Rahman',
    initials: 'AR',
    email: 'ayesha@visahobe.com',
    role: 'admin',
    status: 'active',
    openCases: 3,
    twoFactor: true,
    lastActive: '2026-11-13 09:10',
  },
  {
    id: 'st_3',
    name: 'Tanvir Ahmed',
    initials: 'TA',
    email: 'tanvir@visahobe.com',
    role: 'verifier',
    status: 'active',
    openCases: 3,
    twoFactor: true,
    lastActive: '2026-11-13 09:31',
  },
  {
    id: 'st_4',
    name: 'Farhan Kabir',
    initials: 'FK',
    email: 'farhan@visahobe.com',
    role: 'finance',
    status: 'active',
    openCases: 0,
    twoFactor: true,
    lastActive: '2026-11-12 18:02',
  },
  {
    id: 'st_5',
    name: 'Sadia Islam',
    initials: 'SI',
    email: 'sadia@visahobe.com',
    role: 'policy_editor',
    status: 'active',
    openCases: 0,
    twoFactor: false,
    lastActive: '2026-11-12 16:44',
  },
  {
    id: 'st_6',
    name: 'Nusrat Jahan',
    initials: 'NJ',
    email: 'nusrat@visahobe.com',
    role: 'case_manager',
    status: 'active',
    openCases: 4,
    twoFactor: true,
    lastActive: '2026-11-13 08:55',
  },
  {
    id: 'st_7',
    name: 'Imran Chowdhury',
    initials: 'IC',
    email: 'imran@visahobe.com',
    role: 'case_manager',
    status: 'invited',
    openCases: 0,
    twoFactor: false,
    lastActive: 'never',
  },
];

const permissions = [
  'case.read.all',
  'case.read.assigned',
  'case.write',
  'document.read',
  'document.verify',
  'policy.read',
  'policy.publish',
  'invoice.read',
  'invoice.issue',
  'refund.approve',
  'agent.run',
  'agent.approve',
  'browser.control',
  'repo.merge',
  'deploy.approve',
  'role.manage',
] as const;

type Permission = (typeof permissions)[number];

const roleMatrix: Record<StaffRole, Permission[]> = {
  owner: [...permissions],
  admin: [
    'case.read.all',
    'case.write',
    'document.read',
    'document.verify',
    'policy.read',
    'policy.publish',
    'invoice.read',
    'invoice.issue',
    'agent.run',
    'agent.approve',
    'browser.control',
    'role.manage',
  ],
  case_manager: ['case.read.assigned', 'case.write', 'document.read', 'policy.read', 'agent.run'],
  verifier: ['case.read.all', 'document.read', 'document.verify', 'policy.read'],
  finance: ['case.read.all', 'invoice.read', 'invoice.issue', 'policy.read'],
  policy_editor: ['policy.read', 'document.read'],
};

const roleTone: Record<StaffRole, 'brand' | 'success' | 'info' | 'warning' | 'neutral'> = {
  owner: 'brand',
  admin: 'success',
  case_manager: 'info',
  verifier: 'warning',
  finance: 'neutral',
  policy_editor: 'neutral',
};

const roleLabels: Record<StaffRole, string> = {
  owner: 'Owner',
  admin: 'Admin',
  case_manager: 'Case manager',
  verifier: 'Verifier',
  finance: 'Finance',
  policy_editor: 'Policy editor',
};

export default function TeamPage() {
  const no2fa = staff.filter((s) => !s.twoFactor && s.status !== 'invited');

  return (
    <div className="mx-auto max-w-[1500px]">
      <PageHeader
        title="Team & roles"
        description="Role-based access control. Each role sees a scoped workspace; protected actions are reserved to named roles and always audited."
        breadcrumb="Governance / Team & roles"
        actions={
          <>
            <Button variant="secondary" size="sm">
              <Icon name="download" className="h-3.5 w-3.5" />
              Export access list
            </Button>
            <Button size="sm">
              <Icon name="plus" className="h-3.5 w-3.5" />
              Invite member
            </Button>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <KpiTile
          label="Active staff"
          value={staff.filter((s) => s.status === 'active').length}
          tone="brand"
          icon={<Icon name="team" className="h-4 w-4" />}
        />
        <KpiTile
          label="Pending invites"
          value={staff.filter((s) => s.status === 'invited').length}
          tone="info"
          icon={<Icon name="mail" className="h-4 w-4" />}
        />
        <KpiTile
          label="Without 2FA"
          value={no2fa.length}
          tone="danger"
          icon={<Icon name="lock" className="h-4 w-4" />}
          hint="required for staff"
        />
        <KpiTile
          label="Roles defined"
          value={Object.keys(roleMatrix).length}
          tone="neutral"
          icon={<Icon name="shield-check" className="h-4 w-4" />}
        />
      </div>

      {no2fa.length > 0 ? (
        <div className="mt-4">
          <Alert
            tone="danger"
            title="Two-factor authentication required"
            icon={<Icon name="lock" className="h-4 w-4" />}
          >
            {no2fa.map((s) => s.name).join(' and ')} have not enrolled a second factor. Staff access
            to client documents is blocked until enrolment completes.
          </Alert>
        </div>
      ) : null}

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.6fr_1fr]">
        <div className="min-w-0 space-y-5">
          <Card>
            <CardHeader
              title="Team register"
              description="Status, role, workload and security posture."
            />
            <CardBody className="pt-1">
              <DataTable<StaffMember>
                caption="Staff register"
                rowKey={(row) => row.id}
                rows={staff}
                columns={[
                  {
                    key: 'name',
                    header: 'Member',
                    render: (row) => (
                      <div className="flex items-center gap-2">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-100 text-[10px] font-semibold text-brand-800">
                          {row.initials}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-xs font-medium text-ink">{row.name}</p>
                          <p className="truncate text-[10px] text-ink-tertiary">{row.email}</p>
                        </div>
                      </div>
                    ),
                  },
                  {
                    key: 'role',
                    header: 'Role',
                    render: (row) => (
                      <Badge tone={roleTone[row.role]} size="sm">
                        {roleLabels[row.role]}
                      </Badge>
                    ),
                  },
                  {
                    key: 'status',
                    header: 'Status',
                    render: (row) => (
                      <Badge
                        tone={
                          row.status === 'active'
                            ? 'success'
                            : row.status === 'invited'
                              ? 'info'
                              : 'danger'
                        }
                        size="sm"
                        dot
                      >
                        {row.status}
                      </Badge>
                    ),
                    hideBelow: 'sm',
                  },
                  {
                    key: 'cases',
                    header: 'Cases',
                    render: (row) => (
                      <span className="text-[11px] text-ink numeric">{row.openCases}</span>
                    ),
                    align: 'center',
                    hideBelow: 'md',
                  },
                  {
                    key: '2fa',
                    header: '2FA',
                    render: (row) => (
                      <span className={row.twoFactor ? 'text-success' : 'text-danger'}>
                        {row.twoFactor ? '✓' : '✕'}
                      </span>
                    ),
                    align: 'center',
                    hideBelow: 'lg',
                  },
                  {
                    key: 'lastActive',
                    header: 'Last active',
                    render: (row) => (
                      <span className="whitespace-nowrap font-mono text-[9px] text-ink-tertiary">
                        {row.lastActive}
                      </span>
                    ),
                    align: 'right',
                    hideBelow: 'xl',
                  },
                  {
                    key: 'action',
                    header: '',
                    render: () => (
                      <Button variant="ghost" size="sm">
                        <Icon name="settings" className="h-3.5 w-3.5" />
                      </Button>
                    ),
                    align: 'right',
                  },
                ]}
              />
            </CardBody>
          </Card>

          <Card>
            <CardHeader
              title="Role permission matrix"
              description="A tick means the role holds the permission."
            />
            <CardBody className="overflow-x-auto pt-2">
              <table className="w-full min-w-[720px] border-collapse text-left">
                <caption className="sr-only">Role permission matrix</caption>
                <thead>
                  <tr className="border-b border-line">
                    <th className="sticky left-0 bg-surface py-2 pr-3 text-[10px] font-semibold uppercase tracking-wide text-ink-tertiary">
                      Permission
                    </th>
                    {(Object.keys(roleMatrix) as StaffRole[]).map((role) => (
                      <th
                        key={role}
                        className="px-2 py-2 text-center text-[9px] font-semibold uppercase tracking-wide text-ink-tertiary"
                      >
                        {roleLabels[role].split(' ')[0]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {permissions.map((permission) => (
                    <tr key={permission} className="border-b border-line/70">
                      <td className="sticky left-0 bg-surface py-1.5 pr-3 font-mono text-[10px] text-ink-secondary">
                        {permission}
                      </td>
                      {(Object.keys(roleMatrix) as StaffRole[]).map((role) => {
                        const held = roleMatrix[role].includes(permission);
                        return (
                          <td key={role} className="px-2 py-1.5 text-center">
                            <span
                              className={held ? 'text-success' : 'text-ink-tertiary/30'}
                              aria-label={held ? 'granted' : 'not granted'}
                            >
                              {held ? '✓' : '·'}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-2 text-[10px] text-ink-tertiary">
                Protected actions — refunds, verification approval, policy publication, merges and
                deploys — are never granted to every role, and never to an agent identity.
              </p>
            </CardBody>
          </Card>
        </div>

        <div className="space-y-5">
          <Card>
            <CardHeader title="Workspace scoping" description="What each role can see." />
            <CardBody className="space-y-2 pt-2">
              {[
                ['Owner', 'Everything, including deploys and refunds'],
                ['Admin', 'All cases, verification, policies, team'],
                ['Case manager', 'Only assigned cases'],
                ['Verifier', 'Documents for verification only'],
                ['Finance', 'Invoices and reconciliation (no case notes)'],
                ['Policy editor', 'Policy packs and sources only'],
              ].map(([role, scope]) => (
                <div
                  key={role}
                  className="flex items-start justify-between gap-2 border-b border-line/60 pb-1.5 last:border-0"
                >
                  <span className="shrink-0 text-[10px] font-medium text-ink">{role}</span>
                  <span className="text-right text-[10px] leading-relaxed text-ink-tertiary">
                    {scope}
                  </span>
                </div>
              ))}
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Workload balance" />
            <CardBody className="space-y-2.5 pt-2">
              {staff
                .filter((s) => s.openCases > 0)
                .map((member) => (
                  <div key={member.id}>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-ink">{member.name}</span>
                      <span className="text-ink-tertiary numeric">{member.openCases} open</span>
                    </div>
                    <ProgressBar
                      value={(member.openCases / 8) * 100}
                      tone={member.openCases > 6 ? 'warning' : 'brand'}
                    />
                  </div>
                ))}
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Security requirements" />
            <CardBody className="space-y-2 pt-2">
              {[
                'Staff accounts require a second factor.',
                'Sessions expire after 12 hours of inactivity.',
                'Role changes are audited and notify the owner.',
                'Leavers lose access immediately and their cases are reassigned.',
                'Clients never share an identity with staff.',
                'A partner identity is never treated as staff.',
              ].map((rule) => (
                <p
                  key={rule}
                  className="flex items-start gap-1.5 text-[10px] leading-relaxed text-ink-secondary"
                >
                  <span className="mt-0.5 text-brand-600">✓</span>
                  {rule}
                </p>
              ))}
              <Button variant="secondary" size="sm" fullWidth className="mt-1">
                <Icon name="lock" className="h-3.5 w-3.5" />
                Enforce 2FA now
              </Button>
            </CardBody>
          </Card>

          <div>
            <DisclaimerStrip>
              Admins can change a role but cannot grant themselves a permission they do not already
              hold. Owner-level access can only be transferred by the current owner.
            </DisclaimerStrip>
          </div>
        </div>
      </div>
    </div>
  );
}
