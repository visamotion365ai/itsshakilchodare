import type { Metadata } from 'next';
import {
  Alert,
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  ConsentBlock,
  PageHeader,
  TabNav,
} from '@visahobe/ui';
import { clientProfile, formatDate } from '@visahobe/shared';
import { Icon } from '@/lib/icons';

export const metadata: Metadata = { title: 'Profile and consent' };

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-[1200px]">
      <PageHeader
        title="Profile and consent"
        description="Your identity details, workspace members, security settings and every consent you have granted — with the date it was recorded."
        breadcrumb="Workspace / Profile"
        actions={
          <Button variant="secondary" size="sm">
            <Icon name="settings" className="h-3.5 w-3.5" />
            Account settings
          </Button>
        }
      />

      <TabNav
        active="profile"
        tabs={[
          { id: 'profile', label: 'Profile', href: '#profile' },
          { id: 'family', label: 'Applicants & family', href: '#family' },
          {
            id: 'consent',
            label: 'Consent records',
            href: '#consent',
            count: clientProfile.consents.length,
          },
          { id: 'security', label: 'Security', href: '#security' },
        ]}
      />

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5">
          <Card id="profile" className="scroll-mt-20">
            <CardHeader
              title="Account details"
              description="Used on official forms — keep this consistent with your passport."
              action={
                <Badge tone="success" size="sm">
                  Verified
                </Badge>
              }
            />
            <CardBody>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: 'Full name', value: clientProfile.name },
                  { label: 'Nationality', value: clientProfile.nationality },
                  { label: 'Email', value: clientProfile.email },
                  { label: 'Phone', value: clientProfile.phone },
                  { label: 'Passport expiry', value: formatDate(clientProfile.passportExpiry) },
                  { label: 'Preferred language', value: clientProfile.preferredLanguage },
                  { label: 'Workspace', value: clientProfile.tenantName },
                  { label: 'Member since', value: formatDate(clientProfile.memberSince) },
                ].map((field) => (
                  <div key={field.label}>
                    <p className="text-[10px] uppercase tracking-wide text-ink-tertiary">
                      {field.label}
                    </p>
                    <p className="text-sm text-ink">{field.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-md bg-surface-muted px-3 py-2.5">
                <p className="text-[11px] leading-relaxed text-ink-secondary">
                  Name changes must match a legal document. If your passport shows a different
                  spelling, upload the correction before verification — mismatched names are one of
                  the most common causes of delay.
                </p>
              </div>
            </CardBody>
          </Card>

          <Card id="family" className="scroll-mt-20">
            <CardHeader
              title="Applicants and family members"
              description="Each dependant has an individual record linked to the primary case."
            />
            <CardBody>
              <ul className="divide-y divide-line">
                <li className="flex items-center justify-between gap-3 py-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-700 text-[11px] font-semibold text-white">
                      RH
                    </span>
                    <div>
                      <p className="text-sm font-medium text-ink">{clientProfile.name}</p>
                      <p className="text-[10px] text-ink-tertiary">Primary applicant</p>
                    </div>
                  </div>
                  <Badge tone="brand" size="sm">
                    Primary
                  </Badge>
                </li>
                {clientProfile.familyMembers.map((member) => (
                  <li key={member.name} className="flex items-center justify-between gap-3 py-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-muted text-[11px] font-semibold text-ink-secondary">
                        {member.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </span>
                      <div>
                        <p className="text-sm font-medium text-ink">{member.name}</p>
                        <p className="text-[10px] text-ink-tertiary">
                          {member.relation} · {member.role}
                        </p>
                      </div>
                    </div>
                    <Badge tone="success" size="sm">
                      Active
                    </Badge>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-[11px] leading-relaxed text-ink-tertiary">
                Dependant records are isolated like your own: documents, timeline and verification
                status are tracked separately per person.
              </p>
            </CardBody>
          </Card>

          <Card id="consent" className="scroll-mt-20">
            <CardHeader
              title="Consent records"
              description="Every consent is timestamped and can be withdrawn where the law allows."
            />
            <CardBody className="space-y-2 pt-2">
              {clientProfile.consents.map((consent) => (
                <div
                  key={consent.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-line px-3 py-2.5"
                >
                  <div>
                    <p className="text-xs font-medium text-ink">{consent.label}</p>
                    <p className="font-mono text-[10px] text-ink-tertiary">
                      granted {consent.grantedAt}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge tone={consent.current ? 'success' : 'neutral'} size="sm">
                      {consent.current ? 'Active' : 'Not granted'}
                    </Badge>
                    {consent.id === 'c5' ? (
                      <Button variant="ghost" size="sm">
                        {consent.current ? 'Withdraw' : 'Grant'}
                      </Button>
                    ) : null}
                  </div>
                </div>
              ))}
              <div className="pt-2">
                <ConsentBlock title="Partner coordination consent" checked>
                  Allow VisaHobe to share the minimum necessary records with a named partner when
                  your case requires it. This never includes documents beyond those the partner’s
                  task needs.
                </ConsentBlock>
              </div>
            </CardBody>
          </Card>
        </div>

        <div className="space-y-5">
          <Card id="security" className="scroll-mt-20">
            <CardHeader title="Security" />
            <CardBody className="space-y-3 pt-2">
              {[
                {
                  label: 'Multi-factor authentication',
                  value: clientProfile.mfaEnabled ? 'Enabled · authenticator app' : 'Not enabled',
                  tone: clientProfile.mfaEnabled ? 'success' : 'danger',
                },
                { label: 'Active sessions', value: '2 devices', tone: 'neutral' },
                { label: 'Last sign-in', value: 'Today, 08:42 · Dhaka, BD', tone: 'neutral' },
                { label: 'Password changed', value: '42 days ago', tone: 'neutral' },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-2">
                  <span className="text-xs text-ink-secondary">{row.label}</span>
                  <Badge tone={row.tone as 'success' | 'danger' | 'neutral'} size="sm">
                    {row.value}
                  </Badge>
                </div>
              ))}
              <div className="border-t border-line pt-3">
                <Button variant="secondary" size="sm" fullWidth>
                  <Icon name="shield" className="h-3.5 w-3.5" />
                  Manage security settings
                </Button>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader title="Data and privacy" />
            <CardBody className="space-y-2 pt-2">
              <p className="text-[11px] leading-relaxed text-ink-secondary">
                You can request a copy of your data, correct it, or ask for deletion where retention
                is not legally required.
              </p>
              <div className="flex flex-col gap-2">
                <Button variant="secondary" size="sm" fullWidth>
                  <Icon name="download" className="h-3.5 w-3.5" />
                  Request my data export
                </Button>
                <Button variant="ghost" size="sm" fullWidth>
                  Contact privacy team
                </Button>
              </div>
            </CardBody>
          </Card>

          <Alert tone="info" title="Tenant isolation">
            Your workspace is separated at the database layer. Even a platform bug cannot expose
            another client’s records to your session, and every access attempt — including denied
            ones — is recorded.
          </Alert>
        </div>
      </div>
    </div>
  );
}
