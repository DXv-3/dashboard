export const BUILDER_MODULES = {
  sources: [
    {
      id: 'github',
      label: 'GitHub',
      type: 'source',
      icon: 'github',
      configFields: [
        { key: 'repo', label: 'Repository', placeholder: 'owner/repo' },
        { key: 'token', label: 'Access Token', placeholder: 'ghp_...' }
      ]
    },
    {
      id: 'email',
      label: 'Email',
      type: 'source',
      icon: 'mail',
      configFields: [
        { key: 'account', label: 'Email Account', placeholder: 'user@example.com' },
        { key: 'filter', label: 'Filter', placeholder: 'from:sender' }
      ]
    },
    {
      id: 'web',
      label: 'Web',
      type: 'source',
      icon: 'globe',
      configFields: [
        { key: 'url', label: 'URL', placeholder: 'https://...' },
        { key: 'selector', label: 'CSS Selector', placeholder: '.content' }
      ]
    },
    {
      id: 'api',
      label: 'API',
      type: 'source',
      icon: 'database',
      configFields: [
        { key: 'endpoint', label: 'Endpoint', placeholder: 'https://api.example.com' },
        { key: 'method', label: 'Method', placeholder: 'GET' },
        { key: 'headers', label: 'Headers', placeholder: 'Authorization: Bearer ...' }
      ]
    }
  ],
  processors: [
    {
      id: 'ai-analyze',
      label: 'AI Analyze',
      type: 'processor',
      icon: 'cpu',
      configFields: [
        { key: 'model', label: 'Model', placeholder: 'gpt-4' },
        { key: 'prompt', label: 'Prompt', placeholder: 'Analyze this data...' }
      ]
    },
    {
      id: 'filter',
      label: 'Filter',
      type: 'processor',
      icon: 'search',
      configFields: [
        { key: 'condition', label: 'Condition', placeholder: 'status === "open"' }
      ]
    },
    {
      id: 'transform',
      label: 'Transform',
      type: 'processor',
      icon: 'bar-chart',
      configFields: [
        { key: 'mapping', label: 'Mapping', placeholder: 'field1 -> newField' }
      ]
    }
  ],
  actions: [
    {
      id: 'send-email',
      label: 'Send Email',
      type: 'action',
      icon: 'send',
      configFields: [
        { key: 'to', label: 'To', placeholder: 'recipient@example.com' },
        { key: 'subject', label: 'Subject', placeholder: 'Email subject' },
        { key: 'body', label: 'Body', placeholder: 'Email body...' }
      ]
    },
    {
      id: 'create-pr',
      label: 'Create PR',
      type: 'action',
      icon: 'git-pull-request',
      configFields: [
        { key: 'title', label: 'Title', placeholder: 'PR title' },
        { key: 'branch', label: 'Branch', placeholder: 'feature-branch' },
        { key: 'base', label: 'Base', placeholder: 'main' }
      ]
    },
    {
      id: 'post-comment',
      label: 'Comment',
      type: 'action',
      icon: 'message-square',
      configFields: [
        { key: 'target', label: 'Target', placeholder: 'issue #123' },
        { key: 'message', label: 'Message', placeholder: 'Comment text...' }
      ]
    }
  ]
};

export const PRESET_SCENARIOS = [
  {
    id: 'pr-review',
    title: 'PR Review Assistant',
    prompt: 'Monitor new pull requests, analyze code changes, and post automated review comments',
    pipeline: [
      { ...BUILDER_MODULES.sources[0], instanceId: 1, config: { repo: 'owner/repo' } },
      { ...BUILDER_MODULES.processors[0], instanceId: 2, config: { model: 'gpt-4', prompt: 'Review this code' } },
      { ...BUILDER_MODULES.actions[2], instanceId: 3, config: { target: 'PR', message: 'Review feedback' } }
    ]
  },
  {
    id: 'issue-triage',
    title: 'Issue Triage Bot',
    prompt: 'Automatically categorize and label new GitHub issues based on content',
    pipeline: [
      { ...BUILDER_MODULES.sources[0], instanceId: 4, config: { repo: 'owner/repo' } },
      { ...BUILDER_MODULES.processors[0], instanceId: 5, config: { model: 'gpt-4', prompt: 'Categorize this issue' } },
      { ...BUILDER_MODULES.actions[2], instanceId: 6, config: { target: 'issue', message: 'Labels applied' } }
    ]
  },
  {
    id: 'email-digest',
    title: 'Email Digest Generator',
    prompt: 'Collect emails, summarize with AI, and send daily digest',
    pipeline: [
      { ...BUILDER_MODULES.sources[1], instanceId: 7, config: { account: 'user@example.com' } },
      { ...BUILDER_MODULES.processors[0], instanceId: 8, config: { model: 'gpt-4', prompt: 'Summarize emails' } },
      { ...BUILDER_MODULES.actions[0], instanceId: 9, config: { to: 'user@example.com', subject: 'Daily Digest' } }
    ]
  },
  {
    id: 'web-monitor',
    title: 'Web Content Monitor',
    prompt: 'Monitor website for changes and send notifications',
    pipeline: [
      { ...BUILDER_MODULES.sources[2], instanceId: 10, config: { url: 'https://example.com' } },
      { ...BUILDER_MODULES.processors[1], instanceId: 11, config: { condition: 'changed === true' } },
      { ...BUILDER_MODULES.actions[0], instanceId: 12, config: { to: 'user@example.com', subject: 'Change detected' } }
    ]
  },
  {
    id: 'api-integration',
    title: 'API Data Pipeline',
    prompt: 'Fetch data from API, transform it, and create GitHub issues',
    pipeline: [
      { ...BUILDER_MODULES.sources[3], instanceId: 13, config: { endpoint: 'https://api.example.com/data' } },
      { ...BUILDER_MODULES.processors[2], instanceId: 14, config: { mapping: 'data -> issues' } },
      { ...BUILDER_MODULES.actions[2], instanceId: 15, config: { target: 'GitHub', message: 'New issue' } }
    ]
  }
];
