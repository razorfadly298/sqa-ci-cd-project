const UserRepository = require('../src/userRepository');
const EmailService = require('../src/emailService');

describe('Placeholder implementations', () => {
  test('UserRepository.findById belum diimplementasi', async () => {
    await expect(new UserRepository().findById(1)).rejects.toThrow('Not implemented');
  });
  test('UserRepository.save belum diimplementasi', async () => {
    await expect(new UserRepository().save({})).rejects.toThrow('Not implemented');
  });
  test('EmailService.sendWelcomeEmail belum diimplementasi', async () => {
    await expect(new EmailService().sendWelcomeEmail('a@b.com')).rejects.toThrow('Not implemented');
  });
});
