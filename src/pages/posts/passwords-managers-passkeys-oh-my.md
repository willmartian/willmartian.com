---
title: "Passwords & Password Managers & Passkeys, oh my!"
# blurb: "A jargon-free introduction"
date: 2025-03-20
# comments: "https://fosstodon.org/@willmartian/109285848751638736"
eleventyExcludeFromCollections: false
---

**Passwords** are a flawed technology. There are just too many scenarios where user error can sneak in:
- You forget the password.
- You mistype the password when creating it.
- You use a password that is easily guessed or cracked.
- You enter a password on a fake banking site and it stole your information <span class="text-red-800">(phishing)</span>.
- You reuse the same password across 100 different accounts; one of those sites was not up-to-snuff in their security practices, was hacked, and now the hacker can log into all of your other accounts <span class="text-red-800">(credential-stuffing)</span>.

---

**Password managers** are a type of software that solve many of these problems. 
- You create a single "master password" that unlocks a digital vault which holds all of your other passwords. You ever only have to remember that single password. 
- All passwords *inside* the vault can be long and randomly generated since you don't have to remember them, making them effectively uncrackable, e.g. `#vPLx2$ymK@i3w` <span class="text-emerald-800">(prevents credential-stuffing)</span>.
- You don't have to manually type passwords in when logging in. Most password managers can automatically fill passwords into login fields when visiting known sites <span class="text-emerald-800">(prevents phishing)</span>. 

Password managers, however, are not a silver bullet. They are more of a bandaid solution that try and work around passwords. PMs still rely on *motivated* users to opt-in to better security practices. One can still be lazy and store weak or repeated passwords within a password manager. It would be great if we could instead fix the underlying problem at the app level...

---

**Passkeys** are the new kid on the block. As their name implies, they work kind of like a physical key. Passkeys are just digital keys that are stored on your device.
- You don't *know* a key, you *have* one. (I, for one, do not memorize the grooves to my house key.)
- When you want to login, browser or app asks the device for your passkey. 
- Fake websites can't ask for passkeys that don't belong to them <span class="text-emerald-800">(prevents phishing)</span>.
- Each passkey is unique <span class="text-emerald-800">(prevents credential-stuffing)</span>. 

I guess we don't need password managers any more? Well, not so fast. Passkeys have one glaring issue: they are stored where they are created. Created a passkey on your desktop? Good luck logging in from your phone. Password managers solve this by creating and storing them in the cloud, so you can access them from anywhere.

---

Looking for a password manager that supports passkeys? Try [Bitwarden](https://bitwarden.com). It is cool, open source, has a generous free tier, and I work there. **:^)**
