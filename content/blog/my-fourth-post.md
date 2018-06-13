---
title: Karma and its ways!
date: 2018-06-14T03:21:27+08:00
authors: ["sumantabose"]
categories:
  - features
tags:
  - authors
slug: karma-ways
---

Minimo supports multiple authors for your site. Just make sure you have the following configuration in your site's **`config.toml`**:

```toml
[taxonomies]
author = "authors"
```

Minimo treats Authors as a [Hugo Taxonomy](https://gohugo.io/content-management/taxonomies/).

## Author's Profile

For adding an author to your site:

- Create **`data/authors`** folder in your site's root directory
- Create a file with the filename format: **`<username>.toml`**

Now, add information about the author using the structure below:

**/data/authors/muniftanjim.toml**

{{< file "data/authors/muniftanjim.toml" >}}

_You can use either the `[email]` fields or the `[social.email]` field. You don't need to fill them both. However, it is encouraged to use `[email]` instead of `[social.email]`._

## Adding Authors to Contents

For adding authors to your content include the following option in your content's front-matter:

```yaml
---
authors: ["muniftanjim"]
---
```

- `authors` [`Array` of `String`s]: username of authors

That's all.
