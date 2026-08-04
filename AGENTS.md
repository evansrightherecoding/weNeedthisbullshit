# Repository instructions

## Keep the AutoSSID and NoSSID configurations synchronized

`MyAutoSSID.ini` and `MyNoSSID.ini` are a paired configuration. Always inspect and update both files in the same task.

The only permitted differences between them are the definition and use of the SSID-aware `Current` policy group and the SSID-aware form of the `AI` policy group:

- `MyAutoSSID.ini` may define `Current` as a `ssid` group and reference `[]Current` from other policy groups.
- `MyNoSSID.ini` must not define or reference `Current`; its corresponding fallback is normally `[]Selected`.
- In `MyAutoSSID.ini`, `AI` is intentionally a `ssid` group and may contain its SSID-specific policy mappings. In `MyNoSSID.ini`, the corresponding `AI` group uses the non-SSID form.
- `Current` and the AutoSSID form of `AI` are the only policy groups that may use the `ssid` type unless the user explicitly adds another exception.
- When comparing corresponding policy groups, ignore the presence of `[]Current` in the AutoSSID version and its corresponding `[]Selected` fallback in the NoSSID version, as well as the intentional SSID-specific definition of `AI`. Every other option, order, group type, regex, URL, and parameter must remain consistent.

Everything else must stay synchronized, including:

- `ruleset` names, URLs, and ordering;
- service policy groups and their ordering;
- regional policy groups, group types, regexes, ordering, URLs, and parameters;
- generator flags and base configuration references;
- comments that describe shared behavior.

When changing either file:

1. Make the equivalent change in the other file during the same task.
2. Review a direct diff between the two files before finishing.
3. Confirm that every remaining difference is solely caused by the `Current` group definition, an intentional `Current` versus `Selected` reference, or the SSID-aware definition of `AI`.
4. Fix unrelated drift found between the paired files unless the user explicitly asks to preserve it.
