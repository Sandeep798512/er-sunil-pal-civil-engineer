import assert from 'node:assert';
import { BUSINESS_INFO, SERVICES, GALLERY_ITEMS, PROCESS_STEPS, FAQ_ITEMS, WHY_CHOOSE_US, OUR_APPROACH } from '../data/content';
import { isValidIndianPhone, sanitizeIndianPhone, createWhatsAppUrl, generateEnquiryId } from './helpers';

console.log('🧪 Starting Er. Sunil Pal Website Automated Verification Suite...\n');

// 1. Verify Business Details (Source of Truth)
console.log('1. Verifying Business Information against Source of Truth:');
assert.strictEqual(BUSINESS_INFO.name, 'Er. Sunil Pal', 'Business name must match');
assert.strictEqual(BUSINESS_INFO.role, 'Civil Engineer', 'Profession must be Civil Engineer');
assert.strictEqual(BUSINESS_INFO.primaryPhone, '7030399100', 'Primary phone must be 7030399100');
assert.strictEqual(BUSINESS_INFO.secondaryPhone, '8010801624', 'Secondary phone must be 8010801624');
assert.strictEqual(BUSINESS_INFO.email, 'engineer7030@gmail.com', 'Email must be engineer7030@gmail.com');
assert.ok(
  BUSINESS_INFO.address.full.includes('Shop No. 7') &&
  BUSINESS_INFO.address.full.includes('Building No. 10B') &&
  BUSINESS_INFO.address.full.includes('Sodhi Residency') &&
  BUSINESS_INFO.address.full.includes('Vrindavan Nagari') &&
  BUSINESS_INFO.address.full.includes('Paam') &&
  BUSINESS_INFO.address.full.includes('Boisar') &&
  BUSINESS_INFO.address.full.includes('401501'),
  'Full verified address components must be present'
);
console.log('   ✅ Business name, phones, email, and address are 100% verified.\n');

// 2. Verify Services
console.log('2. Verifying Core Services:');
assert.strictEqual(SERVICES.length, 3, 'Must have exactly 3 core services');
const serviceTitles = SERVICES.map(s => s.title);
assert.ok(serviceTitles.some(t => t.includes('Civil Construction')), 'Must include Civil Construction');
assert.ok(serviceTitles.some(t => t.includes('House Planning')), 'Must include House Planning');
assert.ok(serviceTitles.some(t => t.includes('Flat Sale & Rental')), 'Must include Flat Sale & Rental');
console.log('   ✅ All 3 verified services are correctly configured.\n');

// 3. Verify Phone Validation
console.log('3. Verifying Indian Mobile Number Validation:');
assert.strictEqual(isValidIndianPhone('7030399100'), true, '7030399100 should be valid');
assert.strictEqual(isValidIndianPhone('8010801624'), true, '8010801624 should be valid');
assert.strictEqual(isValidIndianPhone('9820012345'), true, '9820012345 should be valid');
assert.strictEqual(isValidIndianPhone('1234567890'), false, '1234567890 should be invalid (does not start with 6-9)');
assert.strictEqual(isValidIndianPhone('7030399'), false, 'Incomplete number should be invalid');
assert.strictEqual(isValidIndianPhone(''), false, 'Empty phone should be invalid');
assert.strictEqual(sanitizeIndianPhone('+91 70303 99100'), '7030399100', 'Sanitize formatted phone should work');
console.log('   ✅ Indian phone validation logic is robust and correct.\n');

// 4. Verify WhatsApp URL Generation
console.log('4. Verifying WhatsApp URL formatting:');
const sampleMsg = 'Hello Er. Sunil Pal, I have an inquiry.';
const waUrl = createWhatsAppUrl(BUSINESS_INFO.primaryPhone, sampleMsg);
assert.ok(waUrl.startsWith('https://wa.me/917030399100?text='), 'WhatsApp URL must use international format 917030399100');
assert.ok(waUrl.includes(encodeURIComponent(sampleMsg)), 'Message must be URL encoded');
console.log('   ✅ WhatsApp URL generation accurately configured with verified number.\n');

// 5. Verify Reference ID Generator
console.log('5. Verifying Enquiry Reference ID generation:');
const refId1 = generateEnquiryId('PRJ');
const refId2 = generateEnquiryId('PROP');
assert.ok(refId1.startsWith('PRJ-'), 'Project enquiry ID must start with PRJ-');
assert.ok(refId2.startsWith('PROP-'), 'Property enquiry ID must start with PROP-');
assert.notStrictEqual(refId1, refId2, 'Enquiry IDs must be unique');
console.log(`   ✅ Generated sample IDs: ${refId1}, ${refId2}\n`);

// 6. Verify Content Integrity & Zero Fabrications
console.log('6. Verifying absence of fabricated claims:');
const fullContentText = JSON.stringify({
  BUSINESS_INFO,
  SERVICES,
  GALLERY_ITEMS,
  PROCESS_STEPS,
  FAQ_ITEMS,
  WHY_CHOOSE_US,
  OUR_APPROACH
});

// Check for common fake claims
const forbiddenPhrases = [
  'ISO 9001 certified',
  'Government Approved Class 1',
  '500+ completed projects',
  '25 years of experience',
  'Award winning builder',
  'Guaranteed lowest price',
  '100% money back'
];

for (const phrase of forbiddenPhrases) {
  assert.ok(!fullContentText.toLowerCase().includes(phrase.toLowerCase()), `Must not contain fabricated claim: "${phrase}"`);
}
console.log('   ✅ No fake certifications, fake project counts, or exaggerated claims detected.\n');

// 7. Verify Working Process & FAQ
console.log('7. Verifying Process Timeline & FAQ structure:');
assert.strictEqual(PROCESS_STEPS.length, 4, 'Must have 4 process steps');
assert.strictEqual(PROCESS_STEPS[0].step, '01', 'First step is 01 Initial Discussion');
assert.strictEqual(PROCESS_STEPS[1].step, '02', 'Second step is 02 Planning & Consultation');
assert.strictEqual(PROCESS_STEPS[2].step, '03', 'Third step is 03 Project Execution / Delivery');
assert.strictEqual(PROCESS_STEPS[3].step, '04', 'Fourth step is 04 Follow-up & Support');

assert.ok(FAQ_ITEMS.length >= 6, 'Must provide comprehensive FAQ answers');
console.log('   ✅ Process steps and FAQ items are complete and structured.\n');

console.log('🎉 ALL AUTOMATED VERIFICATION CHECKS PASSED SUCCESSFULLY!');
