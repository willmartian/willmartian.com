---
title: "draft - Passwords, Password Managers, and Passkeys (oh my!)"
# blurb: "A jargon-free introduction"
date: 2025-03-20
# comments: "https://fosstodon.org/@willmartian/109285848751638736"
eleventyExcludeFromCollections: true
---

Passwords are an old (*open sesame*) and flawed technology. There are just too many scenarios where user error can sneak in:
- I forgot my password.
- I mistyped my password when creating it.
- I used a password that is easily guessed or cracked.
- I entered my password on a fake banking site and it stole my information (phishing).
- I reused the same password across 100 different accounts, one of those sites was hacked, and now the hacker can log into all of my other accounts (credential stuffing).

Password managers are a type of software that solve many of these problems. 
- You create a single "master password" that unlocks a digital vault which holds all of your other passwords. 
- You ever only have to remember that single password. All passwords inside the vault can be long and randomly generated, making them effectively uncrackable.
- You typically don't have to manually type passwords in when logging in. You just copy and paste from your vault, or rely on the password manager to automatically fill passwords into login fields. 

Password managers, however, are not a silver bullet. They are more of a bandaid solution that try and work around passwords. PMs still rely on motivated users to opt-in to the offered security features. One can still be lazy and use weak or repeated passwords in a password manager. It would be great if we could instead fix the problem at the app/website level...

Passkeys are the new kid on the block. As their name implies, they work kind of like a physical key. Passkeys are just digital keys that are stored on your device.
- You don't *know* a key, you *have* one. (I, for one, do not memorize the grooves to my house key.)
- When you want to login, browser or app asks the device for your passkey. 
- Fake websites can't ask for passkeys that don't belong to them (no phishing).
- Each passkey is unique (no credential stuffing). 


---
Password managers are still useful...