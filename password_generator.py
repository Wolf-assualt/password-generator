#!/usr/bin/env python3
"""
Password Generator CLI
Author: Yuvarajan J

Usage:
    python password_generator.py                  # 12-char password, all char types
    python password_generator.py -l 16             # custom length
    python password_generator.py -l 20 --no-symbols
    python password_generator.py -n 5               # generate 5 passwords
"""

import argparse
import random
import string
import secrets


def build_charset(use_upper, use_lower, use_digits, use_symbols):
    charset = ""
    required = []

    if use_upper:
        charset += string.ascii_uppercase
        required.append(string.ascii_uppercase)
    if use_lower:
        charset += string.ascii_lowercase
        required.append(string.ascii_lowercase)
    if use_digits:
        charset += string.digits
        required.append(string.digits)
    if use_symbols:
        symbols = "!@#$%^&*()_+{}[]<>?/"
        charset += symbols
        required.append(symbols)

    if not charset:
        raise ValueError("At least one character type must be enabled.")

    return charset, required


def generate_password(length, use_upper, use_lower, use_digits, use_symbols):
    charset, required_sets = build_charset(use_upper, use_lower, use_digits, use_symbols)

    if length < len(required_sets):
        raise ValueError(
            f"Length must be at least {len(required_sets)} to include all selected character types."
        )

    # Guarantee at least one char from each selected set (cryptographically secure)
    password_chars = [secrets.choice(s) for s in required_sets]
    password_chars += [secrets.choice(charset) for _ in range(length - len(password_chars))]

    random.SystemRandom().shuffle(password_chars)
    return "".join(password_chars)


def password_strength(password):
    score = 0
    if len(password) >= 8:
        score += 1
    if len(password) >= 12:
        score += 1
    if len(password) >= 16:
        score += 1
    if any(c.isupper() for c in password) and any(c.islower() for c in password):
        score += 1
    if any(c.isdigit() for c in password):
        score += 1
    if any(c in "!@#$%^&*()_+{}[]<>?/" for c in password):
        score += 1

    labels = ["Very Weak", "Weak", "Fair", "Good", "Strong", "Very Strong"]
    return labels[min(score, len(labels) - 1)]


def main():
    parser = argparse.ArgumentParser(description="Generate strong, random passwords.")
    parser.add_argument("-l", "--length", type=int, default=12, help="Password length (default: 12)")
    parser.add_argument("-n", "--number", type=int, default=1, help="How many passwords to generate")
    parser.add_argument("--no-upper", action="store_true", help="Exclude uppercase letters")
    parser.add_argument("--no-lower", action="store_true", help="Exclude lowercase letters")
    parser.add_argument("--no-digits", action="store_true", help="Exclude digits")
    parser.add_argument("--no-symbols", action="store_true", help="Exclude symbols")
    args = parser.parse_args()

    try:
        for _ in range(args.number):
            pwd = generate_password(
                args.length,
                use_upper=not args.no_upper,
                use_lower=not args.no_lower,
                use_digits=not args.no_digits,
                use_symbols=not args.no_symbols,
            )
            print(f"{pwd}   [{password_strength(pwd)}]")
    except ValueError as e:
        print(f"Error: {e}")


if __name__ == "__main__":
    main()
