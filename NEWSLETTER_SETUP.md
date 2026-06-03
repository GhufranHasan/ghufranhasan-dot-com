# Newsletter Setup with Resend

This guide walks you through setting up the newsletter subscription feature with Resend.

## Step 1: Create a Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

## Step 2: Get Your API Key

1. Navigate to the **API Keys** section in your Resend dashboard
2. Click **Create API Key** (or copy the existing one)
3. Give it a descriptive name like "Portfolio Newsletter"
4. Copy the API key (starts with `re_`)

## Step 3: Create an Audience

1. In the Resend dashboard, go to **Audiences**
2. Click **Create Audience**
3. Name it something like "Newsletter Subscribers"
4. Click **Create**
5. Copy the **Audience ID** (you'll need this)

## Step 4: Configure Environment Variables

Create a `.env.local` file in the root of your project (copy from `.env.example`):

```bash
RESEND_API_KEY=re_your_api_key_here
RESEND_SUBSCRIBER_LIST_ID=your_audience_id_here
```

**Example:**
```bash
RESEND_API_KEY=re_1234567890abcdef
RESEND_SUBSCRIBER_LIST_ID=8f5e6d7c-9a0b-1c2d-3e4f-5g6h7i8j9k0l
```

## Step 5: Test the Newsletter

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the newsletter section on your site
3. Enter your email address and click "Join Free"
4. Check:
   - ✅ Success message appears
   - ✅ Email is added to your Resend audience
   - ✅ Confirmation email is sent (optional, configure in Resend)

## Step 6: Verify in Resend Dashboard

1. Go to your Resend dashboard
2. Click on your audience
3. You should see the new subscriber in the list

## Deployment to Vercel

When deploying to Vercel:

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add:
   - `RESEND_API_KEY`: Your API key
   - `RESEND_SUBSCRIBER_LIST_ID`: Your audience ID
4. Deploy your changes

## Troubleshooting

### "Newsletter service not configured"
- ❌ Missing `RESEND_API_KEY` in environment variables
- ✅ Add it to `.env.local` locally or Vercel environment settings for production

### "You are already subscribed"
- This is normal - the same email can't subscribe twice
- Users get a success message to confirm

### "Invalid email address"
- The email didn't pass validation
- Ensure the email format is correct

### No subscribers showing up
- Check that `RESEND_SUBSCRIBER_LIST_ID` is correct
- Verify the API key has proper permissions
- Check the browser console for error messages

## API Endpoint

**Endpoint:** `POST /api/newsletter/subscribe`

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response (Success):**
```json
{
  "message": "Successfully subscribed",
  "email": "user@example.com",
  "id": "subscriber_id"
}
```

**Response (Error):**
```json
{
  "error": "Error message here"
}
```

## Features Implemented

✅ Email validation  
✅ Duplicate subscriber detection  
✅ Error handling and user-friendly messages  
✅ Loading states  
✅ Success confirmation  
✅ Environment variable configuration  
✅ API rate limiting ready (add if needed)  

## Optional: Send Welcome Email

To send a welcome email when users subscribe, update the API route to use Resend's email sending API. Contact support for help if needed.

## Support

- Resend Docs: https://resend.com/docs
- API Reference: https://resend.com/docs/api-reference/intro
