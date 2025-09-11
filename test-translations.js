// Test translation access
async function testTranslation() {
  try {
    const response = await fetch('/locales/en/landing.json');
    const data = await response.json();
    console.log('English translations:', data);

    const mlResponse = await fetch('/locales/ml/landing.json');
    const mlData = await mlResponse.json();
    console.log('Malayalam translations:', mlData);
  } catch (error) {
    console.error('Translation test failed:', error);
  }
}
