# Repository instructions

## Keep the AutoSSID and NoSSID configurations synchronized

`MyAutoSSID.ini` and `MyNoSSID.ini` are a paired configuration. Always inspect and update both files in the same task.

The only permitted differences between them are the definition and use of the SSID-aware `Current` policy group and the SSID-aware forms of the service groups listed below:

- `MyAutoSSID.ini` may define `Current` as a `ssid` group and reference `[]Current` from other policy groups.
- `MyNoSSID.ini` must not define or reference `Current`; its corresponding fallback is normally `[]Selected`.
- `AI`, `US Services`, `HK Finance`, and `Global Exchange` use `ssid` in `MyAutoSSID.ini` and `select` in `MyNoSSID.ini`. The three regional service groups use their respective USA, HongKong, and Taiwan policies for cellular and default Wi-Fi, with `DIRECT` on `AirPort Time Capsule`. Their NoSSID counterparts offer the corresponding region first and include `DIRECT` as a manual option.
- `Current` and the four service groups above are the only policy groups that may use `ssid` in `MyAutoSSID.ini` unless the user explicitly adds another exception.
- When comparing corresponding policy groups, account for the `[]Current` versus `[]Selected` fallback and the intentional `ssid` versus `select` definitions of the four service groups above. Every other option, order, group type, regex, URL, and parameter must remain consistent.

Everything else must stay synchronized, including:

- `ruleset` names, URLs, and ordering;
- service policy groups and their ordering;
- regional policy groups, group types, regexes, ordering, URLs, and parameters;
- generator flags and base configuration references;
- comments that describe shared behavior.

When changing either file:

1. Make the equivalent change in the other file during the same task.
2. Review a direct diff between the two files before finishing.
3. Confirm that every remaining difference is solely caused by the `Current` group definition, an intentional `Current` versus `Selected` reference, or a listed SSID-aware service group definition.
4. Fix unrelated drift found between the paired files unless the user explicitly asks to preserve it.
