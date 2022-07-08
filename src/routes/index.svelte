<script lang="ts">
  let assetId = ''
  let playbackId = ''

  $: disableAssetId = playbackId.length > 0
  $: disablePlaybackId = assetId.length > 0
</script>

<h1>Mux Subtitler</h1>
<form action="/create">
	<div class="form-group">
		<label>
			Asset ID
			<input 
        bind:value={assetId} 
        name="ASSET_ID"
        disabled={disableAssetId}
        required={!disableAssetId}
      />
		</label>
    <i>or</i>
		<label>
			Playback ID
			<input 
        bind:value={playbackId} 
        name="PLAYBACK_ID"
        disabled={disablePlaybackId}
        required={!disablePlaybackId}
      />
		</label>
	</div>
	<div class="form-group">
		<label>
			URL
			<input type="url" name="url" value="https://" required />
		</label>
	</div>
	<div class="form-group">
		<label>
			Type
			<select name="type">
				<option value="text">Text</option>
			</select>
		</label>
	</div>
	<div class="form-group">
		<label>
			Text Type
			<select name="text_type">
				<option value="subtitles">Subtitles</option>
			</select>
		</label>
	</div>
	<div class="form-group">
		<label>
			Language Code
			<input name="language_code" value="en-US" required />
		</label>
	</div>
	<div class="form-group">
		<label>
			Closed Captions
			<select name="closed_captions">
				<option value="true">True</option>
				<option value="false">False</option>
			</select>
		</label>
	</div>
	<div class="form-group">
		<label>
			Passthrough
			<input name="passthrough" value="English" />
		</label>
	</div>
  <div class="form-group">
    <input type="submit" value="Submit" />
  </div>
</form>

<style>
  .form-group {
    margin-bottom: 1rem;
  }
  input[disabled] {
    background-color: lightgray;
  }
</style>