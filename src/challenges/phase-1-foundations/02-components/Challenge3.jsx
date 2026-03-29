export const description = {
  title: 'Build a Page Layout',
  concept: 'Components · Multi-level composition · Component tree · Page structure',
  task: 'Build a mini page layout using two levels of composition. The outer layer: Challenge renders Header, Main, and Footer. The inner layer: Header composes Logo and Nav; Main renders a ProfileCard. All data is hardcoded — define all six components at module scope.',
  hints: [
    'Define leaf components first (Logo, Nav, ProfileCard), then compose them into Header and Main',
    'Header renders Logo and Nav side by side — use style={{ display: "flex", justifyContent: "space-between" }}',
    'ProfileCard can reuse the emoji + name + bio pattern from the previous challenge',
    'All six components must be defined at module scope, not inside each other',
    'Challenge renders: <Header />, <Main />, and <Footer /> in that order',
    'Main should center its content horizontally — think about which flex properties do that',
  ],
  acceptance: [
    'Logo, Nav, Header, ProfileCard, Main, and Footer are all separate component functions',
    'Challenge renders Header, Main, and Footer',
    'Header composes Logo and Nav',
    'Main renders ProfileCard, centered horizontally',
    'No component is defined inside another component',
  ],
}

// TODO: Define all six components here:
// Logo        → renders the app name (e.g. "★ ReactApp")
// Nav         → renders two links: Home and About
// Header      → renders <Logo /> and <Nav /> side by side
// ProfileCard → renders an emoji, a name, and a short bio
// Main        → renders <ProfileCard />
// Footer      → renders "© 2025"

export default function Challenge() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '360px' }}>
      {/* TODO: Render <Header />, <Main />, and <Footer /> here */}
    </div>
  )
}
